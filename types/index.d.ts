export {};

declare global {
  type CardColor = 'light-green' | 'light-blue' | 'light-purple' | 'light-pink' | 'light-red' | 'light-yellow';

  type Annotation = {
    id?: string;
    type?: AnnotationType;
    value?: string;
    ref?: string;
    start?: number;
    end?: number;
    pos?: number;
  };

  type AnnotationType = 'place' | 'date' | 'organization' | 'theme' | 'person';

  type ParagraphLine = {
    type: 'text' | 'annotation';
    value: string;
    id?: string;
    annotationType?: AnnotationType;
  };

  type Author = {
    name: string;
    description: string;
    slug: string;
    photos?: string[];
  };

  type Image = {
    uri: string;
    width?: number;
    height?: number;
  };

  type CustomData = {
    index: number;
    [name: string]: string;
  };

  type Line = {
    paragraphIdx: number;
    lineIdx: number;
    text: string;
    annotations: Annotation[];
  };

  type DiaryPage = {
    pageNumber: number;
    image: Image;
    lines: Line[];
  };

  type Tag = {
    active?: boolean;
    title: string;
    link: string;
  };

  type ColoredCard = {
    description: string;
    image: string;
    imageAlt: string;
    link: string;
    linkText: string;
    variant: CardColor;
  };

  /**
   * Data - JSON-LD
   */
  type Archive = {
    id: string;
    type: string;
    name: string;
  };

  type Collection = {
    id: string;
    type: 'Collection';
    archive: Archive;
  };

  type EntryRef = {
    id: string;
    type: 'Manuscript';
    dateCreated: string;
    name: string;
  };

  type Book = {
    id: string;
    type: 'Book';
    name: string;
    description: string;
    entries?: EntryRef[];
    collections?: Collection[];
  };

  type Entry = {
    id: string;
    type: 'Manuscript';
    text: Text[];
  };

  type Text = {
    id: string;
    value: string;
    items: TextAnnotation;
  };

  type TextAnnotation = {
    id: string;
    type: 'Annotation';
    body: {
      id: string;
      source: string;
    };
    target: {
      id: string;
      // TODO: Define Selectors
      selector: Record<string, string>[];
    };
    source: string;
  };
}
