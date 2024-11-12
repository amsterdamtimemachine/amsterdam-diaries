import jsonld from 'jsonld';

const definitionInfo = {
  name: 'info',
  fields: [
    {
      name: 'id',
      type: 'VARCHAR(255)',
      primary: true,
    },
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'description',
      type: 'text',
    },
  ],
};

/**
 * Framing context
 */
const frame = {
  '@context': {
    '@vocab': 'https://schema.org/',
    id: '@id',
    type: '@type',
    title: 'http://schema.org/name',
    description: 'http://schema.org/description',
  },
  id: {},
  type: {},
  title: {},
  description: {},
};

const importInfo = async (importUrl: string): Promise<ParsedResponse> => {
  const result = await fetch(importUrl);
  const json = await result.json();
  // TODO: Remove this line once the context has been altered in the jsonld file
  json['@context'] = ['https://schema.org/'];
  const framed = await jsonld.frame(json, frame, { omitGraph: false });
  const items = (framed['@graph'] ?? []) as RawInfo[];

  return items.reduce(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (acc: ParsedResponse, { type, ...item }: RawInfo) => {
      acc.info!.push(item);
      return acc;
    },
    {
      info: [],
    },
  );
};

export { definitionInfo, importInfo };
