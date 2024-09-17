import jsonld from 'jsonld';
import generateUniqueSlug from './generateUniqueSlug';

/**
 * Framing contexts
 */
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

/**
 * Public methods
 */
const definitionAuthors = {
  name: 'author',
  fields: [
    {
      name: 'id',
      type: 'VARCHAR(255)',
      primary: true,
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
      name: 'birth_date',
      type: 'TEXT',
    },
    {
      name: 'birth_place_id',
      type: 'VARCHAR(255)',
      foreign: 'resource',
    },
    {
      name: 'death_date',
      type: 'TEXT',
    },
    {
      name: 'death_place_id',
      type: 'VARCHAR(255)',
      foreign: 'resource',
    },
    {
      name: 'description',
      type: 'TEXT',
    },
    {
      name: 'image_id',
      type: 'VARCHAR(255)',
      foreign: 'image',
    },
  ],
};

const importAuthors = async (importUrl: string): Promise<ParsedResponse> => {
  const result = await fetch(importUrl);
  const json = await result.json();
  const framed = await jsonld.frame(json, frame);
  const flatten = await jsonld.flatten(framed, flattenContext);
  const items = (Array.isArray(flatten['@graph']) ? flatten['@graph'] : []) as RawItem[];
  return items.reduce(
    (acc: ParsedResponse, item: RawItem) => {
      if (item?.imageType) {
        item.type = item.imageType;
      }
      switch (item.type) {
        case 'Person':
          acc.author!.push({
            id: item.id,
            name: item.name,
            description: item.description,
            slug: generateUniqueSlug(
              item.name,
              acc.author!.map(eItem => eItem.slug),
            ),
            birth_date: item.birthDate,
            birth_place_id: item.birthPlaceId,
            death_date: item.deathDate,
            death_place_id: item.deathPlaceId,
            image_id: item.imageId,
          } as ParsedAuthor);
          break;
        case 'Place':
          acc.resource!.push({
            id: item.id,
            type: 'Place',
            name: item.name,
          } as ParsedResource);
          break;
        case 'ImageObject':
          acc.image!.push({
            id: item.id,
            content_url: item.contentUrl,
            thumbnail_url: item.thumbnailUrl,
          } as ParsedImage);
          break;
        default:
          throw new Error('Unknown data found while parsing Authors');
      }
      return acc;
    },
    {
      image: [],
      resource: [],
      author: [],
    },
  );
};

export { definitionAuthors, importAuthors };
