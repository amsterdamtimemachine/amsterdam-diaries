import jsonld from 'jsonld';
import generateUniqueSlug from './utils/generateUniqueSlug';

// Types
type FramedResource = {
  id: string;
  type: 'Place' | 'Organization' | 'Person' | 'GeoCoordinates';
  name: string;
  description?: string;
  geo?: {
    id: 'string';
    type: 'GeoCoordinates';
    latitude: number;
    longitude: number;
  };
};

type Resource = {
  id: string;
  type: 'Place' | 'Organization' | 'Person';
  name: string;
  slug: string;
  description?: string;
  latitude?: number;
  longitude?: number;
};

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

const definitionResources = {
  name: 'resource',
  fields: [
    {
      name: 'id',
      type: 'text',
      primary: true,
    },
    {
      name: 'type',
      type: 'text',
    },
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'slug',
      type: 'text',
    },
    {
      name: 'description',
      type: 'text',
    },
    {
      name: 'latitude',
      type: 'real',
    },
    {
      name: 'longitude',
      type: 'real',
    },
  ],
};

const importResources = async (importUrl: string): Promise<Resource[]> => {
  const result = await fetch(importUrl);
  const json = await result.json();
  const framed = await jsonld.frame(json, frame, { omitGraph: false });

  return ((framed['@graph'] ?? []) as FramedResource[]).reduce((acc: Resource[], item: FramedResource) => {
    // Skip GeoCoordinates
    if (item.type === 'GeoCoordinates') {
      return acc;
    }

    // If the resource doesn't have a name, the slug is an empty string
    let slug = '';
    if (item.name) {
      slug = generateUniqueSlug(
        item.name,
        acc.map(eItem => eItem.slug),
      );
    }

    // Add the item to the collections
    acc.push({
      id: item.id,
      type: item.type,
      name: item.name,
      slug,
      description: item.description,
      latitude: item.geo?.latitude,
      longitude: item.geo?.longitude,
    });
    return acc;
  }, []);
};

export { definitionResources, importResources };
