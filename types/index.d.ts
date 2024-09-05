export {};

declare global {
  type CardColor = 'light-green' | 'light-blue' | 'light-purple' | 'light-pink' | 'light-red' | 'light-yellow';

  type Tag = {
    active?: boolean;
    title: string;
    link: string;
  };

  /***************************************************************************/
  /*                                 Display                                 */
  /***************************************************************************/

  type Author = {
    id: string;
    type: 'Person';
    name: string;
    aliases?: string[];
    description: string;
    slug: string;
    photos?: string[];
    birthDate?: string;
    birthPlace?: {
      id: string;
      type?: 'Place';
      name?: string;
    };
    deathDate?: string;
    deathPlace?: {
      id: string;
      type?: 'Place';
      name?: string;
    };
    totalPages: number;
    pages?: Page[];
  };

  type Book = {
    id: string;
    type: 'Book';
    dateCreated: string;
    pages: Page[];
  };

  type Page = {
    id: string;
    type: 'Manuscript';
    dateCreated: string;
    sections: Section[];
  };

  type Resource = {
    id: string;
    name: string;
    slug: string;
    description?: string;
    image?: string;
  };

  type ResourceInfo = {
    title: string;
    description: string;
    defaultImage: string;
    readMore: string;
    overviewLabel: string;
    table: string;
    snippetField: string;
  };

  type Section = TextSection | VisualSection;

  type TextSection = {
    type: 'Heading' | 'Paragraph' | 'Caption'; // TODO: Not yet defining Marginalia
    lines: (TextLine | AnnotationLine)[];
  };

  type VisualSection = {
    type: 'Visual';
    uri: string;
    captions?: TextLine[];
  };

  type TextLine = {
    type: 'Text';
    value: string;
  };

  type AnnotationLine = {
    type: 'Annotation';
    id: string;
    subType: string;
    name?: string;
    description?: string;
    value: string;
    identifyingId?: string;
    classifyingId: string;
    correction?: string;
    slug?: string;
    latitude?: number;
    longitude?: number;
  };

  type ImageOptions = {
    region?: string;
    size?: string;
    rotation?: string;
    quality?: string;
    format?: string;
  };

  type LocationRef = {
    id: string;
    name?: string;
    latitude?: string;
    longitude?: string;
  };

  type DiaryCard = {
    headerTitle: string;
    headerSubtitle: string;
    content: string;
    link: string;
    linkText: string;
  };

  type EntityContext = AnnotationRef & {
    type: 'Annotation';
    id: string;
    subType: string;
  };

  /***************************************************************************/
  /*                           Parse Annotations                             */
  /***************************************************************************/

  type SelectorBody = {
    type: string;
    value: string;
    name?: string;
    description?: string;
    latitude?: string;
    longitude?: string;
  };

  type SelectorTarget = {
    source: string;
    highlight?: string;
    start?: number;
    end?: number;
    content?: string;
  };

  type ParsedAbout = {
    slug: string;
    firstName: string;
    name: string;
  };

  type ParsedIsPartOf = {
    author?: ParsedAbout;
    diaryName?: string;
    temporalCoverage?: string;
  };

  type AnnotationRef = SelectorBody & SelectorTarget & ParsedIsPartOf & { guid?: string };

  /***************************************************************************/
  /*                                 INPUT                                   */
  /***************************************************************************/

  type Line = {
    id: string;
    value: string;
  };

  /**
   * Annotations
   */
  type Annotation = {
    id: string;
    type: 'Annotation';
    body: AnnotationBody | AnnotationBody[];
    target: Target | Target[];
    source: string;
    isPartOf?: IsPartOf;
  };

  type AnnotationBody = Classification | TextualBody | SpecificResource;

  type TextualBody = {
    id: string;
    type: 'TextualBody';
    value: string;
    next?: TextualBody;
    prev?: TextualBody;
  };

  type About = {
    id: string;
    type: string;
    name: string;
  };

  type IsPartOf = {
    id: string;
    type: 'Manuscript' | 'Book';
    name: string;
    isPartOf?: IsPartOf;
    dateCreated?: string;
    about?: About;
    temporalCoverage?: string;
  };

  /**
   * Clarifications
   */
  type Classification = {
    type: 'SpecificResource';
    purpose: 'classifying';
    source:
      | string
      | {
          id: string;
          type: string;
          label: string;
        };
  };

  /**
   * Sources
   */
  type LinkedSource = {
    id: string;
    type: string;
    description: string;
    name: string;
  };

  type GeoSource = LinkedSource & {
    type: 'Place';
    geo: {
      id: string;
      latitude: string;
      longitude: string;
    };
  };

  /**
   * Identifiers
   */
  type ValueIdentifer = {
    id: string;
    purpose: 'identifying';
    value: string | { type: string; '@value': string };
  };

  type SpecificIdentifier = {
    id: string;
    purpose: 'identifying';
    source: GeoSource | LinkedSource;
  };

  /**
   * Targets
   */
  type Target = {
    type: 'SpecificResource';
    source: string | TextualBody;
    selector: Array<TextPositionSelector | TextQuoteSelector>;
  };

  /**
   * Selectors
   */
  type TextQuoteSelector = {
    type: 'TextQuoteSelector';
    exact: string;
  };

  type TextPositionSelector = {
    type: 'TextPositionSelector';
    start: number;
    end: number;
  };

  /***************************************************************************/
  /*                                 NEW                                     */
  /***************************************************************************/

  type DateEntry = {
    id: string;
    value: Date;
  };
}
