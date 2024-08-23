import jsonld from 'jsonld';
import generateUniqueSlug from './utils/generateUniqueSlug';

const frame = {
  '@context': {
    '@vocab': 'https://schema.org/',
    id: '@id',
    type: '@type',
    name: 'name',
    description: 'description',
  },
  '@type': 'Person',
};

const flattenContext = {
  id: '@id',
  type: '@type',
  name: 'https://schema.org/name',
  Person: 'https://schema.org/Person',
  Place: 'https://schema.org/Place',
  description: 'https://schema.org/description',
  birthDate: 'https://schema.org/birthDate',
  birthPlaceId: {
    '@id': 'https://schema.org/birthPlace',
    '@type': '@id',
  },
  deathDate: 'https://schema.org/deathDate',
  deathPlaceId: {
    '@id': 'https://schema.org/deathPlace',
    '@type': '@id',
  },
  imageId: {
    '@id': 'https://schema.org/image',
    '@type': '@id',
  },
  contentUrl: 'https://schema.org/contentUrl',
  thumbnailUrl: 'https://schema.org/thumbnailUrl',
  imageType: 'https://schema.org/type',
};

const definitionAuthors = {
  name: 'author',
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
    {
      name: 'birthDate',
      type: 'text',
    },
    {
      name: 'birthPlaceId',
      type: 'text',
      foreign: 'place',
    },
    {
      name: 'deathDate',
      type: 'text',
    },
    {
      name: 'deathPlaceId',
      type: 'text',
      foreign: 'place',
    },
    {
      name: 'description',
      type: 'text',
    },
    {
      name: 'imageId',
      type: 'text',
      foreign: 'image',
    },
  ],
};

const importAuthors = async (importUrl: string) => {
  const result = await fetch(importUrl);
  const json = await result.json();
  const framed = await jsonld.frame(json, frame);
  const flatten = await jsonld.flatten(framed, flattenContext);
  const items = Array.isArray(flatten['@graph']) ? flatten['@graph'] : [];
  const response: Record<string, any[]> = {
    authors: [],
    places: [],
    images: [],
  };

  items.forEach(item => {
    if (item.imageType) {
      item.type = item.imageType;
    }

    switch (item.type) {
      case 'Person':
        response.authors.push({
          id: item.id,
          birthDate: item.birthDate,
          birthPlaceId: item.birthPlaceId,
          deathDate: item.deathDate,
          deathPlaceId: item.deathPlaceId,
          description: item.description,
          imageId: item.imageId,
          name: item.name,
        });
        break;
      case 'Place':
        response.places.push({
          id: item.id,
          name: item.name,
        });
        break;
      case 'ImageObject':
        response.images.push({
          id: item.id,
          contentUrl: item.contentUrl,
          thumbnailUrl: item.thumbnailUrl,
        });
        break;
      default:
        throw new Error('Unknown data found while parsing Authors');
    }
  });

  // Add unqiue slugs to response.authors
  response.authors = response.authors.reduce((acc: any[], item: any) => {
    acc.push({
      ...item,
      slug: generateUniqueSlug(
        item.name,
        acc.map(eItem => eItem.slug),
      ),
    });
    return acc;
  }, []);

  return response;
};

export { definitionAuthors, importAuthors };
