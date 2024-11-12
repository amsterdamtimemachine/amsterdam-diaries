import { SupportedAnnotationTypes } from '~/data/enums';
import Database from '~/server/utils/database';

// Constants
const ENTRY_BASE_URL = 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/entries';

/**
 * Helpers
 */
const compareIds = (a: string, b: string): boolean => {
  return a?.slice(0, a.length - 1) === b?.slice(0, b.length - 1);
};

/**
 * Database methods
 */
const fetchBlocks = async (entryId: string) => {
  const client = Database.getInstance();
  const query = `
    SELECT b.id,
           b.position,
           b.type,
           b.image_id,
           b.dimensions,
           i.content_url
    FROM block b
    INNER JOIN image i on b.image_id = i.id
    WHERE entry_id = ?`;
  return (await client.query(query, [`${ENTRY_BASE_URL}/${entryId}`])).sort((a, b) => a.position - b.position);
};

const fetchLineData = async (entryId: string) => {
  const client = Database.getInstance();
  const query = `
    SELECT line.id,
           line.position,
           line.value,
           block.position as block_position,
           block.id as block_id
    FROM line
    INNER JOIN block ON line.block_id = block.id
    WHERE block.entry_id = ?`;
  return (await client.query(query, [`${ENTRY_BASE_URL}/${entryId}`])).sort((a, b) => {
    const aPos = a.block_position * 100 + a.position;
    const bPos = b.block_position * 100 + b.position;
    return aPos - bPos;
  });
};

const fetchAnnotations = async (lines: any[]) => {
  const client = Database.getInstance();
  const lineIds = lines.map(line => line.id);
  const placeholders = lines.map(() => `?`).join(', ');
  const types = SupportedAnnotationTypes.map(() => `?`).join(', ');
  const query = `
    SELECT a.*,
           COALESCE(r.name, c.name) as name,
           COALESCE(r.slug, c.slug) as slug,
           r.description as description,
           r.latitude as latitude,
           r.longitude as longitude
    FROM annotation a
    LEFT JOIN resource r ON a.identifying_id = r.id
    LEFT JOIN concept c ON a.classifying_id = c.id
    WHERE a.source_id in (${placeholders})
    AND a.type IN (${types})`;
  return await client.query(query, [...lineIds, ...SupportedAnnotationTypes]);
};

/**
 * Generators
 */
const generateTextLine = (value: string): LineData => {
  return {
    type: 'Text',
    value: value ? value.trim() : '',
  };
};

const generateAnnotationLine = (text: string, data: any): AnnotationData => {
  const subData = data.latitude && data.longitude ? { latitude: data.latitude, longitude: data.longitude } : {};
  return {
    type: 'Annotation',
    id: `${useSimplifyId(data.id)}`,
    subType: data.type,
    name: data.name,
    description: data.description,
    value: text.trim(),
    identifyingId: data.identifying_id,
    classifyingId: data.classifying_id,
    correction: data.correction,
    slug: data.slug,
    ...subData,
  };
};

/**
 * Loop over all the sectionData and prepare the sections
 *
 * TODO: Double check if the replace in the uri is correct
 */
const prepareSections = (sections: any[]): Record<string, SectionData> => {
  return sections.reduce((acc: any, section: any) => {
    switch (section.type) {
      case 'Visual':
        acc[section.id] = {
          type: section.type,
          position: section.position,
          uri: section.content_url.replace(/full/, section.dimensions),
        };
        break;
      default:
        acc[section.id] = {
          type: section.type,
          position: section.position,
          lines: [],
          uri: section.content_url.replace(/full/, section.dimensions),
        };
        break;
    }
    return acc;
  }, {});
};

/**
 * Generate the section with their lines and annotations
 *
 * We prepare all the sections and then loop over all the lineData.
 * Per line, we find matching annotations and split the line in multiple parts if needed.
 * The reason we loop backwards is to maintain the offset of the annotations,
 * in case there are multiple annotations per line.
 */
const generateSections = (sectionData: any[], lineData: any[], annotationData: any[]) => {
  const sections = prepareSections(sectionData);

  for (let idx = lineData.length - 1; idx >= 0; --idx) {
    const line = lineData[idx];
    const section = sections[line.block_id] as TextSectionData;

    // Get the annotations for this line and sort them by start_position
    const annos = annotationData
      .filter(annotation => annotation.source_id === line.id)
      .sort((a, b) => (b.start_position || 0) - (a.start_position || 0));

    // Create reference to do text manupulations on
    let text: string = line.value;

    // If there are no annotations, add the line as text part
    if (!annos.length) {
      const textLine = generateTextLine(text);
      if (textLine.value.length) {
        section.lines.unshift(textLine);
      }
    } else {
      // Loop over the annotations and slice the text into parts
      for (let idx = 0; idx < annos.length; ++idx) {
        const ref = annos[idx];

        // If there is text after the ref, slice that into a separate part
        if (ref.end_position && ref.end_position < line.value.length) {
          const part = text.slice(ref.end_position);
          const remaining = text.slice(0, ref.end_position);
          const textLine = generateTextLine(part);
          if (textLine.value.length) {
            section.lines.unshift(textLine);
          }
          text = remaining;
        }

        // Slice the annotation value into a seperate part
        if (ref.start_position >= 0 && ref.end_position <= line.value.length) {
          const part = text.slice(ref.start_position, ref.end_position);
          const remaining = text.slice(0, ref.start_position);
          const annotation = generateAnnotationLine(part, ref);
          section.lines.unshift(annotation);
          text = remaining;
        }
      }

      // If after parsing all the refs, there is text left.
      // Add it as text part
      if (text.length) {
        const textLine = generateTextLine(text);
        if (textLine.value.length) {
          section.lines.unshift(textLine);
        }
      }
    }
  }
  return sections;
};

/**
 * Post processing method to combine hyphenated words
 */
const combineLines = (lines: (LineData | AnnotationData)[]) => {
  for (let idx = 0; idx < lines.length; ++idx) {
    const line = lines[idx];
    const nextLine = lines[idx + 1];
    const endsWithHyphen = line.value.endsWith('-');

    if (endsWithHyphen && nextLine) {
      // Fetch the values for this and next line
      const values = line.value.split(' ');
      const lastWord = values.pop();
      const [nextWord, ...rest] = nextLine.value.split(' ');
      const hyphenatedWord = lastWord!.replace(/-$/, nextWord);

      // Determine the hyphenatedWord's location, annotations get priority to owning it
      if (line?.type === 'Annotation') {
        line.value = `${values.join(' ')} ${hyphenatedWord}`;
        nextLine.value = rest.join(' ');
      } else {
        line.value = values.join(' ');
        nextLine.value = `${hyphenatedWord} ${rest.join(' ')}`;
      }
    }

    // Check if this line and the next line need to be merged into 1 line.
    // If they do, remove the next line and reparse this line.
    const bothText = line?.type === 'Text' && nextLine?.type === 'Text';
    const sameAnnotion =
      line?.type === 'Annotation' && nextLine?.type === 'Annotation' && compareIds(line?.id, nextLine?.id);
    if (bothText || sameAnnotion) {
      line.value = `${line.value} ${nextLine.value}`;
      lines.splice(idx + 1, 1);
      idx--;
    }
  }
  return lines;
};

/**
 * Handler to fetch the sections for a single entry:
 * - Fetch all block, lines and annotation data
 * - Generate the sections
 * - Post process the sections
 */
export default defineEventHandler<Promise<SectionData[]>>(async event => {
  const entryId = getRouterParam(event, 'entryId') as string;
  const blocks = await fetchBlocks(entryId);
  const lines = await fetchLineData(entryId);
  const annotations = lines.length ? await fetchAnnotations(lines) : [];
  const sectionIdx = generateSections(blocks, lines, annotations);
  const sections = [];
  for (const idx in sectionIdx) {
    const section = sectionIdx[idx];

    switch (section.type) {
      case 'Visual':
        sections.push(section);
        break;
      default:
        section.lines = combineLines(section.lines);
        sections.push(section);
        break;
    }
  }
  return sections;
});
