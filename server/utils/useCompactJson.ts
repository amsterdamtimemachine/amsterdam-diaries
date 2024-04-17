import jsonld from 'jsonld';
import type { JsonLdDocument } from 'jsonld';

const sharedContext = {
  '@vocab': 'https://schema.org/',
  id: '@id',
  type: '@type',
};

const frames = {
  authors: {
    '@context': {
      ...sharedContext,
    },
    '@type': 'Person',
  },
  booksForAuthor: {
    '@context': {
      ...sharedContext,
    },
    '@type': 'Book',
    dateCreated: {},
    '@explicit': true,
  },
  diary: {
    '@context': {
      ...sharedContext,
      xsd: 'http://www.w3.org/2001/XMLSchema#',
      dateCreated: {
        '@type': 'xsd:date',
      },
      entries: 'https://schema.org/hasPart',
    },
    '@type': 'Book',
    '@explicit': true,
    name: {},
    description: {},
    entries: {
      '@default': [],
      '@type': 'Manuscript',
      name: {},
      dateCreated: {},
    },
  },
  entry: {
    '@context': [
      'https://www.w3.org/ns/anno.jsonld',
      {
        ...sharedContext,
        items: {
          '@id': 'http://www.w3.org/ns/activitystreams#items',
        },
        latitude: {
          '@type': 'xsd:double',
          '@id': 'https://schema.org/latitude',
        },
        longitude: {
          '@type': 'xsd:double',
          '@id': 'https://schema.org/longitude',
        },
        name: {
          '@id': 'https://schema.org/name',
        },
      },
    ],
    '@type': 'Manuscript',
    '@explicit': true,
    text: {},
  },
};

export default async (type: keyof typeof frames, uri: string) => {
  const response = (await $fetch(uri)) as JsonLdDocument;
  return await jsonld.frame(response, frames[type]);
};
