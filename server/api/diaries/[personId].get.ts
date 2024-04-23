const fetchAndParseAnnotations = async (pageId: string) => {
  const config = useRuntimeConfig();
  const uri = `${config.app.getAnnotationsUri}?entry=${pageId}`;
  const json = await useCompactJson('getAnnotation', uri);
  const annotations = [];
  if (Array.isArray(json['@graph'])) {
    for (let idx = 0; idx < json['@graph'].length; ++idx) {
      const annotation = await useParseAnnotation(json['@graph'][idx] as Annotation);
      if (annotation) {
        annotations.push(...annotation);
      }
    }
  }
  return annotations;
};

const generateTextpart = (value: string): TextLine => {
  return {
    type: 'Text',
    value: value.trim(),
  };
};

const generateAnnotationPart = (value: string, ref: AnnotationRef): AnnotationLine => {
  const { name, description, value: reference, type, latitude, longitude, source } = ref;
  const subData = latitude && longitude ? { latitude, longitude } : {};

  return {
    type: 'Annotation',
    id: useSimplifyId(source),
    subType: type,
    name,
    description,
    reference,
    value: value.trim(),
    ...subData,
  };
};

const fetchAndParseText = async (pageId: string) => {
  const config = useRuntimeConfig();
  const uri = `${config.app.getTextUri}?entry=${pageId}`;
  const json = await useCompactJson('getText', uri);
  const annotations = await fetchAndParseAnnotations(pageId);
  const sections = [];

  if (Array.isArray(json['items'])) {
    for (let index = json['items'].length - 1; index >= 0; --index) {
      const section: any = json['items'][index];
      const lines = [];
      const items = useForceArray(section.items);

      for (let idx = items.length - 1; idx >= 0; --idx) {
        const parts: Array<TextLine | AnnotationLine> = [];
        const { id, value } = items[idx].body;
        const annos = annotations
          .filter(annotation => annotation.source === id)
          .sort((a, b) => (b.start || 0) - (a.start || 0));

        if (!annos.length) {
          parts.unshift(generateTextpart(value));
        } else {
          let text: string = value;
          for (let idx = 0; idx < annos.length; ++idx) {
            const ref = annos[idx];
            // If there is text after the ref, slice that into a separate part
            if (ref.end && ref.end < value.length) {
              const part = text.slice(ref.end);
              const remaining = text.slice(0, ref.end);
              parts.unshift(generateTextpart(part));
              text = remaining;
            }

            // Slice the annotation value into a seperate part
            if (ref.start && ref.end && ref.start >= 0 && ref.end <= value.length) {
              const part = text.slice(ref.start, ref.end);
              const remaining = text.slice(0, ref.start);
              parts.unshift(generateAnnotationPart(part, ref));
              text = remaining;
            }
          }

          // If after parsing all the refs, there is text left.
          // Add it as text part
          if (text.length) {
            parts.unshift(generateTextpart(text));
          }
        }
        lines.unshift(...parts);
      }

      sections.unshift({
        type: section.type,
        lines,
      });
    }
  }
  return sections;
};

const fetchAndParsePages = async (diaryId: string) => {
  const config = useRuntimeConfig();
  const uri = `${config.app.getEntriesOfDiaryUri}?diary=${diaryId}`;
  const json = await useCompactJson('entriesOfDiary', uri);
  const result = [];
  if (Array.isArray(json['@graph'])) {
    for (let idx = 0; idx < json['@graph'].length; ++idx) {
      const page = json['@graph'][idx];
      result.push({
        ...page,
        id: useSimplifyId(page.id as string),
        sections: await fetchAndParseText(page.id as string),
      });
    }
  }
  return result;
};

const fetchAndParseDiaries = async (id: string) => {
  const config = useRuntimeConfig();
  const uri = `${config.app.getDiariesOfAuthorUri}?person=${id}`;
  const json = await useCompactJson('diariesOfAuthor', uri);
  const result = [];
  if (Array.isArray(json['@graph'])) {
    for (let idx = 0; idx < json['@graph'].length; ++idx) {
      const diary = json['@graph'][idx];
      result.push({
        ...diary,
        id: useSimplifyId(diary.id as string),
        pages: await fetchAndParsePages(diary.id as string),
      });
    }
  }
  return result;
};

// TODO: Add caching
// TODO: Break up in multiple files or refactor for reuse
export default defineEventHandler(async event => {
  const config = useRuntimeConfig();
  const personId = getRouterParam(event, 'personId');
  const id = `${config.app.personBaseUri}${personId}`;

  try {
    const diaries = await fetchAndParseDiaries(id);
    return { diaries };
  } catch (e) {
    console.error('Error: ', e);
    setResponseStatus(event, 400);
  }
});
