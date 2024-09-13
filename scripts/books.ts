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
      type: 'VARCHAR(255)',
      primary: true,
    },
    {
      name: 'author_id',
      type: 'VARCHAR(255)',
      foreign: 'author',
    },
    {
      name: 'about_id',
      type: 'VARCHAR(255)',
      foreign: 'author',
    },
    {
      name: 'name',
      type: 'TEXT',
    },
    {
      name: 'description',
      type: 'TEXT',
    },
    {
      name: 'temporal_coverage',
      type: 'TEXT',
    },
    {
      name: 'date_created',
      type: 'TEXT',
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
        entry.push({ id: e.id, book_id: item.id, position: i + 1 } as ParsedEntry);
      }
    }
    return {
      id: item.id,
      author_id: item.author?.id,
      about_id: item.about?.id,
      name: item.name,
      description: item.description,
      temporal_coverage: item.temporalCoverage,
      date_created: item.dateCreated,
    };
  });
  return { book, entry };
};

export { importBooks, definitionBooks };
