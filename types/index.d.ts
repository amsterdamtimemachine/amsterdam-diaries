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
}
