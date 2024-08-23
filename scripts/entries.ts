import jsonld from 'jsonld';
import type { Frame } from 'jsonld/jsonld-spec';

const frame: Frame = {
  '@context': {
    '@vocab': 'https://schema.org/',
    id: '@id',
    type: '@type',
    name: 'name',
    description: 'description',
    dateCreated: {
      '@id': 'https://schema.org/dateCreated',
      '@type': 'http://www.w3.org/2001/XMLSchema#date',
    },
    bookId: {
      '@id': 'https://schema.org/isPartOf',
      '@type': '@id',
    },
    targets: {
      '@id': 'http://www.w3.org/ns/oa#hasTarget',
      '@type': '@id',
      '@container': '@list',
    },
  },
  '@type': 'Manuscript',
  id: {},
  name: {},
  bookId: {},
  dateCreated: {},
  targets: {},
};

const definitionEntries = {
  name: 'entry',
  fields: [
    {
      name: 'id',
      type: 'text',
      primary: true,
    },
    {
      name: 'bookId',
      type: 'text',
      foreign: 'book',
    },
    {
      name: 'position',
      type: 'integer',
    },
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'dateCreated',
      type: 'text',
    },
  ],
};

const importEntries = async (importUrl: string) => {
  const result = await fetch(importUrl);
  const json = await result.json();
  const framed = await jsonld.frame(json, frame, { explicit: true, omitGraph: false });
  const items = Array.isArray(framed['@graph']) ? framed['@graph'] : [];

  return items.reduce(
    (acc: any, { targets, id, dateCreated, bookId, name }: any) => {
      const entry = {
        id,
        name,
        dateCreated,
        bookId: bookId.id,
      };
      const parsedTargets = (targets ?? []).map((target: string, index: number) => {
        return {
          id: target,
          parentId: id,
          position: index + 1,
        };
      });
      // Update the accumulator and return it
      acc.entries.push(entry);
      acc.paragraphs.push(...parsedTargets);
      return acc;
    },
    {
      entries: [],
      paragraphs: [],
    },
  );
};

export { definitionEntries, importEntries };
