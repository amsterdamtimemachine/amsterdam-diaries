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
  diariesOfAuthor: {
    '@context': {
      ...sharedContext,
    },
    '@type': 'Book',
    dateCreated: {},
    '@explicit': true,
  },
  entriesOfDiary: {
    '@context': {
      ...sharedContext,
      xsd: 'http://www.w3.org/2001/XMLSchema#',
      dateCreated: {
        '@type': 'xsd:date',
      },
    },
    '@type': 'Manuscript',
    dateCreated: {},
    '@explicit': true,
  },
  getText: {
    '@context': [
      'https://www.w3.org/ns/anno.jsonld',
      {
        '@vocab': 'https://schema.org/',
        items: {
          '@id': 'as:items',
        },
        Visual: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/tags/regions/visual',
        Caption: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/tags/regions/caption',
        Heading: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/tags/regions/heading',
        Marginalia: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/tags/regions/marginalia',
        'Page number': 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/tags/regions/page-number',
        Paragraph: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/tags/regions/paragraph',
        Region: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/tags/regions/region',
      },
    ],
    '@type': 'Manuscript',
    items: {
      '@type': {},
      items: {},
    },
  },
  getAnnotation: {
    '@context': [
      'https://www.w3.org/ns/anno.jsonld',
      {
        '@vocab': 'https://schema.org/',
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
        Concept: 'skos:Concept',
      },
    ],
    '@type': 'Annotation',
  },
};

export default async (type: keyof typeof frames, uri: string) => {
  const response = (await $fetch(uri)) as JsonLdDocument;
  return await jsonld.frame(response, frames[type]);
};
