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
    book: {
      '@id': 'https://schema.org/isPartOf',
      '@type': '@id',
    },
    targets: 'https://schema.org/hasPart',
  },
  '@type': 'Manuscript',
  id: {},
  name: {},
  book: {},
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
      type: 'VARCHAR(255)',
      primary: true,
    },
    {
      name: 'book_id',
      type: 'VARCHAR(255)',
      foreign: 'book',
    },
    {
      name: 'position',
      type: 'INT',
    },
    {
      name: 'name',
      type: 'TEXT',
    },
    {
      name: 'date_created',
      type: 'TEXT',
    },
  ],
};

const importEntries = async (importUrl: string): Promise<ParsedResponse> => {
  const result = await fetch(importUrl);
  const json = await result.json();
  const framed = await jsonld.frame(json, frame, { explicit: true, omitGraph: false });
  const items = (Array.isArray(framed['@graph']) ? framed['@graph'] : []) as RawEntry[];

  return items.reduce(
    (acc: ParsedResponse, { targets, id, dateCreated, book, name }: RawEntry) => {
      const entry = {
        id,
        name,
        date_created: dateCreated,
        book_id: book.id,
      };

      const parsedTargets = (Array.isArray(targets) ? targets : [targets]).map((target: string, index: number) => {
        return {
          id: target,
          entry_id: id,
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
