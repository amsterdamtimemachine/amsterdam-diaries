export {};

// TODO: Clean up the old types and rename new ones to make more sense
declare global {
  type CardColor = 'light-green' | 'light-blue' | 'light-purple' | 'light-pink' | 'light-red' | 'light-yellow';

  type Author = {
    name: string;
    description: string;
    slug: string;
    photos?: string[];
  };

  type Tag = {
    active?: boolean;
    title: string;
    link: string;
  };

  // TODO: Check - Not used?
  type ColoredCard = {
    description: string;
    image: string;
    imageAlt: string;
    link: string;
    linkText: string;
    variant: CardColor;
  };

  /***************************************************************************/
  /*                                 Display                                 */
  /***************************************************************************/

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

  type Section = {
    type: 'Heading' | 'Paragraph'; // TODO: Not yet defining Marginalia
    lines: TextLine | AnnotationLine[];
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
    reference: string;
    value: string;
    latitude?: string;
    longitude?: string;
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
    value?: string;
    start?: number;
    end?: number;
  };

  type AnnotationRef = SelectorBody & SelectorTarget;

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
  };

  type AnnotationBody = Classification | TextualBody | SpecificResource;

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
    source: string;
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
}
