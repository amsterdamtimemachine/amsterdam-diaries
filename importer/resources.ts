import jsonld from 'jsonld';
import generateUniqueSlug from './generateUniqueSlug';

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
    latitude: {
      '@type': 'http://www.w3.org/2001/XMLSchema#double',
      '@id': 'https://schema.org/latitude',
    },
    longitude: {
      '@type': 'http://www.w3.org/2001/XMLSchema#double',
      '@id': 'https://schema.org/longitude',
    },
  },
  id: {},
  name: {},
  description: {},
  geo: {
    latitude: {},
    longitude: {},
  },
};

/**
 * Public methods
 */
const definitionResources = {
  name: 'resource',
  fields: [
    {
      name: 'id',
      type: 'VARCHAR(255)',
      primary: true,
    },
    {
      name: 'type',
      type: 'TEXT',
    },
    {
      name: 'name',
      type: 'TEXT',
    },
    {
      name: 'slug',
      type: 'TEXT',
    },
    {
      name: 'description',
      type: 'TEXT',
    },
    {
      name: 'latitude',
      type: 'FLOAT',
    },
    {
      name: 'longitude',
      type: 'FLOAT',
    },
  ],
};

const importResources = async (importUrl: string): Promise<ParsedResponse> => {
  const result = await fetch(importUrl);
  const json = await result.json();
  const framed = await jsonld.frame(json, frame, { omitGraph: false });
  const items = (framed['@graph'] ?? []) as RawResource[];

  return items.reduce(
    (acc: ParsedResponse, item: RawResource) => {
      // Skip GeoCoordinates
      if (item.type === 'GeoCoordinates') {
        return acc;
      }

      // If the resource doesn't have a name, the slug is an empty string
      let slug = '';
      if (item.name) {
        slug = generateUniqueSlug(
          item.name,
          acc.resource!.map(eItem => eItem.slug),
        );
      }

      // Add the item to the collections
      acc.resource!.push({
        id: item.id,
        type: item.type,
        name: item.name,
        slug,
        description: item.description,
        latitude: item.geo?.latitude,
        longitude: item.geo?.longitude,
      });
      return acc;
    },
    {
      resource: [],
    },
  );
};

export { definitionResources, importResources };
