import jsonld from 'jsonld';
import generateUniqueSlug from './utils/generateUniqueSlug';

/**
 * Framing context
 */
const frame = {
  '@context': {
    id: '@id',
    name: 'http://www.w3.org/2000/01/rdf-schema#label',
  },
  type: 'Concept',
  id: {},
  name: {},
};

/**
 * Public methods
 */
const definitionConcepts = {
  name: 'concept',
  fields: [
    {
      name: 'id',
      type: 'text',
      primary: true,
    },
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'slug',
      type: 'text',
    },
  ],
};

const importConcepts = async (importUrl: string): Promise<ParsedResponse> => {
  const result = await fetch(importUrl);
  const json = await result.json();
  const framed = await jsonld.frame(json, frame, { explicit: true, omitGraph: false });
  return ((framed['@graph'] ?? []) as RawConcept[]).reduce(
    (acc: ParsedResponse, item: RawConcept) => {
      acc.concept!.push({
        id: item.id,
        name: item.name,
        slug: generateUniqueSlug(
          item.name,
          acc.concept!.map(eItem => eItem.slug),
        ),
      });
      return acc;
    },
    {
      concept: [],
    },
  );
};

export { definitionConcepts, importConcepts };
