const sharedContext = {
  '@vocab': 'https://schema.org/',
  id: '@id',
  type: '@type',
};

export const AuthorsFrame = {
  '@context': {
    ...sharedContext,
  },
  '@type': 'Person',
};

export const DiariesOfAuthorFrame = {
  '@context': {
    ...sharedContext,
  },
  '@type': 'Book',
  dateCreated: {},
  '@explicit': true,
};

export const EntriesOfDiaryFrame = {
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
};

export const TextFrame = {
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
};

export const AnnotationFrame = {
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
      xsd: 'http://www.w3.org/2001/XMLSchema#',
      dateCreated: {
        '@type': 'xsd:date',
      },
      Person: 'https://schema.org/Person',
    },
  ],
  '@type': 'Annotation',
};

export const LocationsPerAuthorFrame = {
  '@context': [
    'https://www.w3.org/ns/anno.jsonld',
    {
      '@vocab': 'https://schema.org/',
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
  '@type': 'Annotation',
};
