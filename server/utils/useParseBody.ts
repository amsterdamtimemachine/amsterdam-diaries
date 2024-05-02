/**
 * Value Identifier
 */
const isValueIdentifier = (input: any): input is ValueIdentifer => {
  return (input as ValueIdentifer).value !== undefined;
};

const parseValueIdentifier = (input: ValueIdentifer) => {
  return {
    value: typeof input.value === 'string' ? input.value : input.value['@value'],
  };
};

/**
 * Specific Identifier
 */
const isSpecificIdentifier = (input: any): input is SpecificIdentifier => {
  return (input as SpecificIdentifier).source !== undefined;
};

const parseSpecificIdentifier = ({ source }: SpecificIdentifier): SelectorBody => {
  const output = {
    type: source.type,
    value: source.id,
    name: source.name,
    description: source.description,
  } as SelectorBody;

  // TODO: Probably not the best solution for this, but it works for now
  if (typeof output.type === 'string' && output.type.startsWith('https://schema.org/')) {
    output.type = output.type.replace('https://schema.org/', '');
  }

  if (Object.hasOwn(source, 'geo')) {
    const { latitude, longitude } = (source as GeoSource).geo;
    output.latitude = latitude;
    output.longitude = longitude;
  }
  return output;
};

/**
 * Helper function to parse the identifying body entry
 */
const parseIdentifying = (input: SpecificIdentifier | ValueIdentifer) => {
  if (isValueIdentifier(input)) {
    return parseValueIdentifier(input);
  }

  if (isSpecificIdentifier(input)) {
    return parseSpecificIdentifier(input);
  }
  return {};
};

/**
 * Helper function that only tries to determine the classification based on the source
 */
const parseBodyIntoType = (input: Classification) => {
  return typeof input.source === 'string' ? input.source : input.source.label;
};

export default (body: AnnotationBody | AnnotationBody[]) => {
  const data: AnnotationBody[] = useForceArray(body);
  return data.reduce((result: SelectorBody, body: AnnotationBody) => {
    switch (body.purpose) {
      case 'classifying':
        result.type = parseBodyIntoType(body);
        break;
      case 'identifying':
        result = {
          ...result,
          ...parseIdentifying(body),
        };
        break;
    }
    return result;
  }, {});
};
