// Constants
const ENTRY_BASE_URL = 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/entries';

/**
 * Helpers
 */
const compareIds = (a: string, b: string) => {
  return a?.slice(0, a.length - 1) === b?.slice(0, b.length - 1);
};

/**
 * Database methods
 */
const fetchBlocks = async (entryId: string) => {
  const client = getClient();
  const query = {
    text: `SELECT b.id,
                  b.position,
                  b.type,
                  b.imageid,
                  b.dimensions,
                  i.contenturl
           FROM block b
           INNER JOIN image i on b.imageid = i.id
           WHERE entryid = $1`,
    values: [`${ENTRY_BASE_URL}/${entryId}`],
  };
  return (await client.query(query)).rows.sort((a, b) => a.position - b.position);
};

const fetchLineData = async (entryId: string) => {
  const client = getClient();
  const query = {
    text: `SELECT line.id,
                  line.position,
                  line.value,
                  block.position as blockPosition,
                  block.id as blockId
           FROM line
           INNER JOIN block ON line.blockid = block.id
           WHERE block.entryid = $1`,
    values: [`${ENTRY_BASE_URL}/${entryId}`],
  };
  return (await client.query(query)).rows.sort((a, b) => {
    const aPos = a.blockposition * 100 + a.position;
    const bPos = b.blockposition * 100 + b.position;
    return aPos - bPos;
  });
};

const fetchAnnotations = async (lines: any[]) => {
  const client = getClient();
  const lineIds = lines.map(line => line.id);
  const placeholders = lines.map((_, index: number) => `$${index + 1}`).join(', ');
  const query2 = {
    text: `SELECT a.*,
                  r.name as name,
                  r.description as description,
                  r.latitude as latitude,
                  r.longitude as longitude,
                  r.slug as slug
           FROM annotation a
           LEFT JOIN resource r ON a.identifyingid = r.id
           WHERE a.sourceid in (${placeholders})
           AND a.type IN ('Person', 'Place', 'Etenswaren', 'Organization', 'Date', 'Blackening')`,
    values: lineIds,
  };
  return (await client.query(query2)).rows;
};

/**
 * Generators
 */
const generateTextLine = (value: string): TextLine => {
  return {
    type: 'Text',
    value: value ? value.trim() : '',
  };
};

const generateAnnotationLine = (text: string, data: any) => {
  const subData = data.latitude && data.longitude ? { latitude: data.latitude, longitude: data.longitude } : {};
  const obj = {
    type: 'Annotation',
    id: `${useSimplifyId(data.id)}`,
    subType: data.type,
    name: data.name,
    description: data.description,
    value: text.trim(),
    identifyingId: data.identifyingid,
    classifyingId: data.classifyingid,
    correction: data.correction,
    slug: data.slug,
    ...subData,
  };

  // Filter out null values from the object
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return Object.fromEntries(Object.entries(obj).filter(([_, value]) => value !== null));
};

/**
 * Loop over all the sectionData and prepare the sections
 *
 * TODO: Double check if the replace in the uri is correct
 */
const prepareSections = (sections: any[]): Record<string, any> => {
  return sections.reduce((acc: any, section: any) => {
    switch (section.type) {
      case 'Visual':
        acc[section.id] = {
          type: section.type,
          position: section.position,
          uri: section.contenturl.replace(/full/, section.dimensions),
        };
        break;
      default:
        acc[section.id] = {
          type: section.type,
          position: section.position,
          lines: [],
          uri: section.contenturl.replace(/full/, section.dimensions),
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
    const section = sections[line.blockid];

    // Get the annotations for this line and sort them by startposition
    const annos = annotationData
      .filter(annotation => annotation.sourceid === line.id)
      .sort((a, b) => (b.startposition || 0) - (a.startposition || 0));

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
        if (ref.endposition && ref.endposition < line.value.length) {
          const part = text.slice(ref.endposition);
          const remaining = text.slice(0, ref.endposition);
          const textLine = generateTextLine(part);
          if (textLine.value.length) {
            section.lines.unshift(textLine);
          }
          text = remaining;
        }

        // Slice the annotation value into a seperate part
        if (ref.startposition >= 0 && ref.endposition <= line.value.length) {
          const part = text.slice(ref.startposition, ref.endposition);
          const remaining = text.slice(0, ref.startposition);
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
 * Post processing method to fix hypenated words and combine annotations
 * Due to how the data is being processed an Annotation can be span multiple lines,
 * this method identifies the same annotation and combines them into a single annotation
 * Similar it detects text lines that end with a hyphen and stitches the hyphenated word back together
 */
const combineLines = (section: any) => {
  if (section.type === 'Visual') {
    return section;
  }
  for (let idx = 0; idx < section.lines.length; ++idx) {
    const line = section.lines[idx];
    const nextLine = section.lines[idx + 1];

    // Check if the line ends with a hyphen, if so remove it
    const endsWithHyphen = line.value.endsWith('-');
    if (endsWithHyphen) {
      line.value = line.value.replace(/-$/, '');
    }

    // If the line and the next line are the same annotation combine them
    if (line?.type === 'Annotation' && nextLine?.type === 'Annotation' && compareIds(line?.id, nextLine?.id)) {
      line.value = `${line.value}${endsWithHyphen ? '' : ' '}${nextLine.value}`;
      section.lines.splice(idx + 1, 1);
    }

    // If the line and next line are text and the line ended with a hyphen, combine them
    if (line?.type === 'Text' && nextLine?.type === 'Text' && endsWithHyphen) {
      const [nextWord, ...rest] = nextLine.value.split(' ');
      if (rest.length === 0) {
        section.lines.splice(idx + 1, 1);
      } else {
        nextLine.value = rest.join(' ');
      }
      line.value = `${line.value}${nextWord}`;
    }
  }
  return section;
};

/**
 * Handler to fetch the sections for a single entry:
 * - Fetch all block, lines and annotation data
 * - Generate the sections
 * - Post process the sections
 */
export default defineEventHandler(async event => {
  const entryId = getRouterParam(event, 'entryId') as string;
  const blocks = await fetchBlocks(entryId);
  const lines = await fetchLineData(entryId);
  const annotations = lines.length ? await fetchAnnotations(lines) : [];
  const sectionIdx = generateSections(blocks, lines, annotations);
  const sections = [];
  for (const idx in sectionIdx) {
    sections.push(combineLines(sectionIdx[idx]));
  }
  return {
    sections,
  };
});
