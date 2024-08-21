import jsonld from 'jsonld';

type item = {
  id: string;
  author: {
    id: string;
  };
  about: {
    id: string;
  };
  name: string;
  description: string;
  temporalCoverage: string;
  dateCreated: string;
  hasPart?: {
    '@list': { id: string }[];
  };
};

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

const importBooks = async (importUrl: string) => {
  const response = await fetch(importUrl);
  const json = await response.json();
  const framed = await jsonld.frame(json, frame, { explicit: true, omitGraph: false });
  const entries: { id: string; bookId: string; position: number }[] = [];

  const books = ((framed['@graph'] ?? []) as item[]).map(item => {
    if (item.hasPart) {
      for (let i = 0; i < item.hasPart['@list'].length; i++) {
        const entry = item.hasPart['@list'][i];
        entries.push({ id: entry.id, bookId: item.id, position: i + 1 });
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
  return { books, entries };
};

export { importBooks, definitionBooks };
