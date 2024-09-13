export {};

declare global {
  type AnnotationType = 'Date' | 'Place' | 'Theme' | 'Person' | 'Organization';

  /****************************************************************************/
  /*                         Raw Types (JSON-LD input)                        */
  /****************************************************************************/

  type InfoData = {
    id: string;
    title: string;
    description: string;
  };

  type RawClassification = {
    type: 'SpecificResource';
    source: {
      id: string;
      type: string;
      label: string;
    };
    purpose: 'classifying';
  };

  type RawExternalResource = {
    type: 'SpecificResource';
    source: {
      id: string;
      type: string;
    };
    purpose: 'identifying';
  };

  type RawTextualResource = {
    type: 'TextualBody';
    value: {
      '@type': string;
      '@value': string;
    };
    purpose: 'identifying';
  };

  type RawTextQuoteSelector = {
    type: 'TextQuoteSelector';
    exact: string;
  };

  type RawTextPositionSelector = {
    type: 'TextPositionSelector';
    start: number;
    end: number;
  };

  type RawTarget = {
    type: 'SpecificResource';
    source: string;
    selector: (RawTextQuoteSelector | RawTextPositionSelector)[];
  };

  type RawAnnotationBody = RawClassification | RawExternalResource | RawTextualResource;

  type RawAnnotation = {
    type: 'Annotation';
    id: string;
    body: RawAnnotationBody[];
    target: RawTarget[];
  };

  type RawBook = {
    id: string;
    author: {
      id: string;
    };
    about: {
      id: string;
    };
    name: string;
    description: string;
    temporalCoverage: string;
    dateCreated: string;
    hasPart?: {
      '@list': { id: string }[];
    };
  };

  type RawConcept = {
    '@type': string;
    id: string;
    name: string;
  };

  type RawResource = {
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

  type RawEntry = {
    id: string;
    type: 'Manuscript';
    dateCreated: string;
    targets: string[];
    book: {
      id: string;
      type: 'Book';
    };
    name: string;
  };

  type RawLine = {
    id: string;
    type: 'Annotation';
    textGranularity: string;
    body: {
      id: string;
      type: string;
      value: string;
      purpose: string;
    }[];
    target: RawTarget;
  };

  type RawItem = {
    [key: string | number]: any;
  };

  /****************************************************************************/
  /*                        Parsed Types (partials)                           */
  /****************************************************************************/

  type ParsedAnnotationTarget = {
    source_id: string;
    exact_text: string;
    start_position: number;
    end_position: number;
  };

  type ParsedAnnotationBody = {
    identifying_id?: string;
    classifying_id?: string;
    correction?: string;
    type?: AnnotationType;
  };

  /****************************************************************************/
  /*                         Parsed Types (output)                            */
  /****************************************************************************/

  type ParsedAnnotation = {
    id: string;
    type: string;
    identifying_id?: string;
    classifying_id: string;
    source_id: string;
    exact_text: string;
    start_position: number;
    end_position: number;
    correction?: string;
  };

  type ParsedAuthor = {
    id: string;
    name: string;
    description: string;
    slug: string;
    birth_date: string;
    birth_place_id: string;
    death_date?: string;
    death_place_id?: string;
    image_id?: string;
  };

  type ParsedBlock = {
    id: string;
    entry_id?: string;
    type?: string;
    position?: number;
    image_id?: string;
    dimensions?: string;
  };

  type ParsedBook = {
    id: string;
    author_id: string;
    about_id: string;
    name: string;
    description: string;
    temporal_coverage: string;
    date_created: string;
  };

  type ParsedConcept = {
    id: string;
    name: string;
    slug: string;
  };

  type ParsedEntry = {
    id: string;
    name: string;
    book_id: string;
    position?: number;
    date_created: string;
  };

  type ParsedImage = {
    id: string;
    content_url: string;
    thumbnail_url: string;
  };

  type ParsedResource = {
    id: string;
    type: 'Place' | 'Organization' | 'Person';
    name: string;
    slug: string;
    description?: string;
    latitude?: number;
    longitude?: number;
  };

  /****************************************************************************/
  /*                       Parsed Types (collection)                          */
  /****************************************************************************/

  type ParsedResponse = {
    annotation?: ParsedAnnotation[];
    author?: ParsedAuthor[];
    block?: ParsedBlock[];
    book?: ParsedBook[];
    concept?: ParsedConcept[];
    entry?: ParsedEntry[];
    image?: ParsedImage[];
    line?: any[];
    resource?: ParsedResource[];
    info?: InfoData[];
  };
}
