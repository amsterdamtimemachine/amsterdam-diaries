import jsonld from 'jsonld';

// Types
type person = {
  id: string;
  name: string;
  description?: string;
};
type organization = {
  id: string;
  name: string;
  description?: string;
  latitude?: number;
  longitude?: number;
};
type place = organization;
type fOrganization = organization & {
  geo: {
    latitude: number;
    longitude: number;
  };
};
type fPlace = fOrganization;

// Frames
const personFrame = {
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
  description: {},
};
const organizationFrame = {
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
  '@type': 'Organization',
  id: {},
  name: {},
  description: {},
  geo: {
    latitude: {},
    longitude: {},
  },
};
const placeFrame = {
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
  '@type': 'Place',
  id: {},
  name: {},
  description: {},
  geo: {
    latitude: {},
    longitude: {},
  },
};

// Definitions
const definitionPeople = {
  name: 'people',
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
      name: 'description',
      type: 'text',
    },
  ],
};
const definitionOrganizations = {
  name: 'organization',
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
const definitionPlaces: typeof definitionOrganizations & { name: 'place' } = {
  ...definitionOrganizations,
  name: 'place',
};

const importResources = async (
  importUrl: string,
): Promise<{
  people: person[];
  organizations: organization[];
  places: place[];
}> => {
  const result = await fetch(importUrl);
  const json = await result.json();

  const resources = {
    people: [] as person[],
    organizations: [] as organization[],
    places: [] as place[],
  };

  const frameJson = async (frame: any): Promise<any[]> => {
    const framedData = await jsonld.frame(json, frame, { explicit: true, omitGraph: false });
    return (framedData['@graph'] ?? []) as any[];
  };

  resources.people = (await frameJson(personFrame)).map((item: person) => {
    return {
      id: item.id,
      name: item.name,
      description: item.description,
    };
  });
  resources.organizations = (await frameJson(organizationFrame)).map((item: fOrganization) => {
    return {
      id: item.id,
      name: item.name,
      description: item.description,
      latitude: item.geo?.latitude,
      longitude: item.geo?.longitude,
    };
  });
  resources.places = (await frameJson(placeFrame)).map((item: fPlace) => {
    return {
      id: item.id,
      name: item.name,
      description: item.description,
      latitude: item.geo?.latitude,
      longitude: item.geo?.longitude,
    };
  });

  return resources;
};

export {
  definitionPeople,
  definitionOrganizations,
  definitionPlaces,
  importResources
};
