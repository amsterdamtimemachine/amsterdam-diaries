import jsonld from 'jsonld';
import type { Frame } from 'jsonld/jsonld-spec';

/**
 * Framing context
 */
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
    targets: 'https://schema.org/hasPart',
  },
  '@type': 'Manuscript',
  id: {},
  name: {},
  bookId: {},
  dateCreated: {},
  targets: {},
};

/**
 * Public methods
 */
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

const importEntries = async (importUrl: string): Promise<ParsedResponse> => {
  const result = await fetch(importUrl);
  const json = await result.json();
  const framed = await jsonld.frame(json, frame, { explicit: true, omitGraph: false });
  const items = (Array.isArray(framed['@graph']) ? framed['@graph'] : []) as RawEntry[];

  return items.reduce(
    (acc: ParsedResponse, { targets, id, dateCreated, bookId, name }: RawEntry) => {
      const entry = {
        id,
        name,
        dateCreated,
        bookId: bookId.id,
      };

      const parsedTargets = (Array.isArray(targets) ? targets : [targets]).map((target: string, index: number) => {
        return {
          id: target,
          entryId: id,
          position: index + 1,
        };
      });
      // Update the accumulator and return it
      acc.entry!.push(entry);
      acc.block!.push(...parsedTargets);
      return acc;
    },
    {
      block: [],
      entry: [],
    },
  );
};

export { definitionEntries, importEntries };
