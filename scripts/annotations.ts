const parseBody = (body: RawAnnotationBody[]): ParsedAnnotationBody => {
  return body.reduce(
    (result: ParsedAnnotationBody, body: RawAnnotationBody) => {
      switch (body.purpose) {
        case 'classifying':
          result.classifyingId = body.source.id;
          result.type = body.source.label;
          break;
        case 'identifying':
          switch (body.type) {
            case 'SpecificResource':
              result.identifyingId = body.source.id;
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
      identifyingId: undefined,
      classifyingId: undefined,
      correction: undefined,
      type: undefined,
    },
  );
};

const parseTarget = (targets: RawTarget[]): ParsedAnnotationTarget[] => {
  return targets.map((target: RawTarget) => {
    // TODO: Talk to Leon about target being the line not the body
    const result = {
      sourceId: target.source.replace(/-body$/, ''),
    } as ParsedAnnotationTarget;
    target.selector.forEach((selector: RawTextQuoteSelector | RawTextPositionSelector) => {
      switch (selector.type) {
        case 'TextQuoteSelector':
          result.exactText = selector.exact;
          break;
        case 'TextPositionSelector':
          result.startPosition = selector.start;
          result.endPosition = selector.end;
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
      type: 'text',
      primary: true,
    },
    {
      name: 'type',
      type: 'text',
    },
    {
      name: 'identifyingId',
      type: 'text',
    },
    {
      name: 'classifyingId',
      type: 'text',
    },
    {
      name: 'sourceId',
      type: 'text',
    },
    {
      name: 'exactText',
      type: 'text',
    },
    {
      name: 'startPosition',
      type: 'integer',
    },
    {
      name: 'endPosition',
      type: 'integer',
    },
    {
      name: 'correction',
      type: 'text',
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
