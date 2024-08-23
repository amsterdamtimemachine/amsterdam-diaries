import jsonld from 'jsonld';
import generateUniqueSlug from './utils/generateUniqueSlug';

// TODO: Ask Leon about type and @type
type item = {
  '@type'?: string;
  id: string;
  name: string;
  slug: string;
};

const frame = {
  '@context': {
    id: '@id',
    name: 'http://www.w3.org/2000/01/rdf-schema#label',
  },
  type: 'Concept',
  id: {},
  name: {},
};

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

const importConcepts = async (importUrl: string) => {
  const result = await fetch(importUrl);
  const json = await result.json();
  const framed = await jsonld.frame(json, frame, { explicit: true, omitGraph: false });
  return ((framed['@graph'] ?? []) as item[]).reduce((acc: item[], item: item) => {
    acc.push({
      id: item.id,
      name: item.name,
      slug: generateUniqueSlug(
        item.name,
        acc.map(eItem => eItem.slug),
      ),
    });
    return acc;
  }, []);
};

export { definitionConcepts, importConcepts };
