const parseBody = (body: RawAnnotationBody[]): ParsedAnnotationBody => {
  return body.reduce(
    (result: ParsedAnnotationBody, body: RawAnnotationBody) => {
      switch (body.purpose) {
        case 'classifying':
          result.classifying_id = body.source.id;
          // TODO: Remove the if-statement when the data is correct
          result.type = (body.source.label === 'Etenswaren' ? 'Theme' : body.source.label) as AnnotationType;
          break;
        case 'identifying':
          switch (body.type) {
            case 'SpecificResource':
              result.identifying_id = body.source.id;
              break;
            case 'TextualBody':
              result.correction = body.value['@value'];
              break;
          }
          break;
      }
      return result;
    },
    {
      identifying_id: undefined,
      classifying_id: undefined,
      correction: undefined,
      type: undefined,
    },
  );
};

const parseTarget = (targets: RawTarget[]): ParsedAnnotationTarget[] => {
  return targets.map((target: RawTarget) => {
    // TODO: Talk to Leon about target being the line not the body
    const result = {
      source_id: target.source.replace(/-body$/, ''),
    } as ParsedAnnotationTarget;
    target.selector.forEach((selector: RawTextQuoteSelector | RawTextPositionSelector) => {
      switch (selector.type) {
        case 'TextQuoteSelector':
          result.exact_text = selector.exact;
          break;
        case 'TextPositionSelector':
          result.start_position = selector.start;
          result.end_position = selector.end;
          break;
      }
    });
    return result;
  });
};

const definitionAnnotations = {
  name: 'annotation',
  fields: [
    {
      name: 'id',
      type: 'VARCHAR(255)',
      primary: true,
    },
    {
      name: 'type',
      type: 'TEXT',
    },
    {
      name: 'identifying_id',
      type: 'TEXT',
    },
    {
      name: 'classifying_id',
      type: 'TEXT',
    },
    {
      name: 'source_id',
      type: 'TEXT',
    },
    {
      name: 'exact_text',
      type: 'TEXT',
    },
    {
      name: 'start_position',
      type: 'INT',
    },
    {
      name: 'end_position',
      type: 'INT',
    },
    {
      name: 'correction',
      type: 'TEXT',
    },
  ],
};

const importAnnotations = async (importUrl: string): Promise<ParsedResponse> => {
  const result = await fetch(importUrl);
  const json = await result.json();

  // Parse all annotations into multiple entries
  const annotations = ((json ?? []) as RawAnnotation[]).reduce(
    (result: Record<string, ParsedAnnotation>, annotation: RawAnnotation) => {
      const id = annotation.id;
      const body = parseBody(annotation.body);
      const targets = parseTarget(annotation.target);
      targets.forEach((target: any, index: number) => {
        result[id + index] = {
          id: id + index,
          ...body,
          ...target,
        };
      });
      return result;
    },
    {},
  );

  // Filter out invalid entries
  return {
    annotation: Object.values(annotations),
  };
};

export { definitionAnnotations, importAnnotations };
