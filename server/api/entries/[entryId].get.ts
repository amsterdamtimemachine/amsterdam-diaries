const fetchAndParseAnnotations = async (pageId: string) => {
  const items = await useFetchGraph('getAnnotation', pageId);
  const annotations = [];

  for (let idx = 0; idx < items.length; ++idx) {
    const annotation = await useParseAnnotation(items[idx] as Annotation);
    if (annotation) {
      annotations.push(...annotation);
    }
  }
  const supportedAnnotations = ['Place', 'Etenswaren', 'Person', 'https://schema.org/Person', 'Date'];
  return annotations.filter(filter => supportedAnnotations.includes(filter.type));
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

const parseTextBasedSection = (section: any, annotations: AnnotationRef[]): TextSection => {
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

  return {
    type: section.type,
    lines,
  };
};

const parseVisualBasedSection = (section: any) => {
  const config = useRuntimeConfig();
  const filename = section.target.source.split('/').pop();
  const dimensions = section.target.selector.value.replace('xywh=', '');
  const uri = `${config.app.imageServerUri}/${filename}/${dimensions}/max/0/default.jpg`;
  const items = useForceArray(section.items);
  const captions = items.map(item => {
    return generateTextpart(item.body.value);
  });

  return {
    type: section.type,
    uri,
    captions,
  };
};

const fetchAndParseText = async (pageId: string) => {
  const config = useRuntimeConfig();
  const uri = `${config.app.getTextUri}?entry=${pageId}`;
  const json = await useCompactJson('getText', uri);
  const annotations = await fetchAndParseAnnotations(pageId);
  const items = useForceArray(json['items']);
  const sections = [];

  for (let index = items.length - 1; index >= 0; --index) {
    const section: any = items[index];
    switch (section.type) {
      case 'Visual':
        sections.unshift(parseVisualBasedSection(section));
        break;
      case 'Heading':
      case 'Paragraph':
        sections.unshift(parseTextBasedSection(section, annotations));
        break;
    }
  }
  return sections.filter(x => x);
};

export default defineEventHandler(async event => {
  const config = useRuntimeConfig();
  const entryId = getRouterParam(event, 'entryId');
  const id = `${config.app.entryBaseUri}${entryId}`;

  try {
    const sections = await fetchAndParseText(id);
    return { sections };
  } catch (e) {
    console.error('Error: ', e);
    setResponseStatus(event, 400);
  }
});
