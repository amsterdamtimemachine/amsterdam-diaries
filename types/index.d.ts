export {};

declare global {
  type CardColor = 'light-green' | 'light-blue' | 'light-purple' | 'light-pink' | 'light-red' | 'light-yellow';

  type Annotation = {
    id?: string;
    type?: string;
    value?: string;
    ref?: string;
    start?: number;
    end?: number;
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
