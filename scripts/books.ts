import jsonld from 'jsonld';

/**
 * Framing context
 */
const frame = {
  '@context': {
    '@vocab': 'https://schema.org/',
    id: '@id',
    type: '@type',
    name: 'name',
    description: 'description',
  },
  '@type': 'Book',
  id: {},
  author: {
    id: {},
  },
  about: {
    id: {},
  },
  name: {},
  description: {},
  temporalCoverage: {},
  dateCreated: {},
  hasPart: [],
};

/**
 * Public methods
 */
const definitionBooks = {
  name: 'book',
  fields: [
    {
      name: 'id',
      type: 'text',
      primary: true,
    },
    {
      name: 'authorId',
      type: 'text',
      foreign: 'author',
    },
    {
      name: 'aboutId',
      type: 'text',
      foreign: 'author',
    },
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'description',
      type: 'text',
    },
    {
      name: 'temporalCoverage',
      type: 'text',
    },
    {
      name: 'dateCreated',
      type: 'text',
    },
  ],
};

const importBooks = async (importUrl: string): Promise<ParsedResponse> => {
  const response = await fetch(importUrl);
  const json = await response.json();
  const framed = await jsonld.frame(json, frame, { explicit: true, omitGraph: false });
  // TODO: Refactor this to use a reduce function
  const entry: ParsedEntry[] = [];
  const book = ((framed['@graph'] ?? []) as RawBook[]).map(item => {
    if (item.hasPart) {
      for (let i = 0; i < item.hasPart['@list'].length; i++) {
        const e = item.hasPart['@list'][i];
        entry.push({ id: e.id, bookId: item.id, position: i + 1 } as ParsedEntry);
      }
    }
    return {
      id: item.id,
      authorId: item.author?.id,
      aboutId: item.about?.id,
      name: item.name,
      description: item.description,
      temporalCoverage: item.temporalCoverage,
      dateCreated: item.dateCreated,
    };
  });
  return { book, entry };
};

export { importBooks, definitionBooks };
