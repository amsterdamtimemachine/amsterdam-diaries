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

const parseBody = (body: (Classification | ExternalResource | TextualResource)[]) => {
  return body.reduce(
    (result: any, body: Classification | ExternalResource | TextualResource) => {
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
      identifyingId: null,
      classifyingId: null,
      correction: null,
      type: null,
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

/**
 * Special method to filter out cases that aren't valid
 * Currently this is only for Dates without a correction,
 * since it prevents us from showing the correct value
 */
const filterInvalidAnnotations = (annotations: any[], concepts: any[]) => {
  // Generate a list of names
  const conceptNames = concepts.map(concept => concept.name);

  // Filter certain annotations
  return annotations.filter((annotation: any) => {
    if (annotation.type === 'Date') {
      const invalidDate = /\d{4}-\d{2}-\d{2}$/.test(annotation.correction);
      if (!invalidDate) {
        console.warn('Invalid Date Annotation: ', annotation);
        return false;
      }
    } else if (!annotation.identifyingId && !conceptNames.includes(annotation.type)) {
      console.warn('Invalid Annotation: ', annotation);
      return false;
    }
    return true;
  });
};

const importAnnotations = async (importUrl: string, concepts: any[]) => {
  const result = await fetch(importUrl);
  const json = await result.json();

  // Parse all annotations into multiple entries
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

  // Filter out invalid entries
  return filterInvalidAnnotations(Object.values(annotations), concepts);
};

export { definitionAnnotations, importAnnotations };
