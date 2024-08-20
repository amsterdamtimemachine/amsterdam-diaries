import jsonld from 'jsonld';

type item = {
  id: string;
  name: string;
  birthDate: string;
  birthPlace: {
    id: string;
  };
  deathDate: string;
  deathPlace: {
    id: string;
  };
  description: string;
  image: {
    id: string;
    contentUrl: string;
    thumbnailUrl: string;
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
  '@type': 'Person',
  id: {},
  name: {},
  birthDate: {},
  birthPlace: {},
  deathDate: {},
  deathPlace: {},
  image: {
    id: {},
    contentUrl: {},
    thumbnailUrl: {},
  },
  description: {},
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
      name: 'imageUrl',
      type: 'text',
    },
    {
      name: 'contentUrl',
      type: 'text',
    },
    {
      name: 'thumbnailUrl',
      type: 'text',
    },
  ],
};

const importAuthors = async (importUrl: string) => {
  const result = await fetch(importUrl);
  const json = await result.json();
  const framed = await jsonld.frame(json, frame, { explicit: true, omitGraph: false });
  return ((framed['@graph'] ?? []) as item[]).map(item => {
    return {
      id: item.id,
      name: item.name,
      birthDate: item.birthDate,
      birthPlaceId: item.birthPlace?.id,
      deathDate: item.deathDate,
      deathPlaceId: item.deathPlace?.id,
      description: item.description,
      imageUrl: item.image?.id,
      contentUrl: item.image?.contentUrl,
      thumbnailUrl: item.image?.thumbnailUrl,
    };
  });
};

export { definitionAuthors, importAuthors };
