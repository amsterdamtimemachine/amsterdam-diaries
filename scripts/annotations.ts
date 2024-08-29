type Classification = {
  type: 'SpecificResource';
  source: {
    id: string;
    type: string;
    label: string;
  };
  purpose: 'classifying';
};

type ExternalResource = {
  type: 'SpecificResource';
  source: {
    id: string;
    type: string;
  };
  purpose: 'identifying';
};

type TextualResource = {
  type: 'TextualBody';
  value: {
    '@type': string;
    '@value': string;
  };
  purpose: 'identifying';
};

type TextQuoteSelector = {
  type: 'TextQuoteSelector';
  exact: string;
};

type TextPositionSelector = {
  type: 'TextPositionSelector';
  start: number;
  end: number;
};

type Target = {
  type: 'SpecificResource';
  source: string;
  selector: (TextQuoteSelector | TextPositionSelector)[];
};

type Annotation = {
  type: 'Annotation';
  id: string;
  body: (Classification | ExternalResource | TextualResource)[];
  target: Target[];
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
      name: 'externalId',
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
      name: 'value',
      type: 'text',
    },
  ],
};

const parseBody = (body: (Classification | ExternalResource | TextualResource)[]) => {
  return body.reduce(
    (result: any, body: Classification | ExternalResource | TextualResource) => {
      switch (body.purpose) {
        case 'classifying':
          result.type = body.source.label;
          break;
        case 'identifying':
          switch (body.type) {
            case 'SpecificResource':
              result.externalId = body.source.id;
              break;
            case 'TextualBody':
              result.value = body.value['@value'];
              break;
          }
          break;
      }
      return result;
    },
    {
      type: '',
      externalId: '',
      value: '',
    },
  );
};

const parseTarget = (targets: Target[]) => {
  return targets.map((target: Target) => {
    // TODO: Talk to Leon about target being the line not the body
    const result: any = {
      sourceId: target.source.replace(/-body$/, ''),
    };
    target.selector.forEach((selector: TextQuoteSelector | TextPositionSelector) => {
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

const importAnnotations = async (importUrl: string) => {
  const result = await fetch(importUrl);
  const json = await result.json();
  const annotations = ((json ?? []) as Annotation[]).reduce((result: any, annotation: Annotation) => {
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
  }, {});
  return Object.values(annotations);
};

export { definitionAnnotations, importAnnotations };
