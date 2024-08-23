const definitionParagraphs = {
  name: 'paragraph',
  fields: [
    {
      name: 'id',
      type: 'text',
      primary: true,
    },
    {
      name: 'entryId',
      type: 'text',
      foreign: 'entry',
    },
    {
      name: 'position',
      type: 'integer',
    },
    {
      name: 'imageId',
      type: 'text',
      foreign: 'image',
    },
    {
      name: 'dimensions',
      type: 'text',
    },
  ],
};

const importParagraphs = async (importUrl: string) => {
  const result = await fetch(importUrl);
  const json = await result.json();
  const paragraphs = json.filter((data: any) => {
    return data.textGranularity === 'block' && data.body?.[0]?.source?.label === 'Paragraph';
  });

  const data = paragraphs.reduce(
    (acc: any, paragraph: any) => {
      // Parse the lines
      const lines = paragraph.items.map((item: any, index: number) => {
        return {
          id: item,
          paragraphId: paragraph.id,
          position: index + 1,
        };
      });

      // Parse the target for the image data
      const image = {
        id: paragraph.target.source['@id'],
        contentUrl: paragraph.target.source.contentUrl,
        thumbnailUrl: paragraph.target.source.thumbnailUrl,
      };

      // Find the fragment selector
      const fragmentSelector = paragraph.target.selector.find((selector: any) => {
        return selector.type === 'FragmentSelector';
      });

      // Update the accumulator and return it
      acc.paragraphs.push({
        id: paragraph.id,
        imageId: image.id,
        dimensions: fragmentSelector.value,
      });
      acc.lines.push(...lines);
      acc.images[image.id] = image;
      return acc;
    },
    {
      paragraphs: [],
      lines: [],
      images: {},
    },
  );
  return {
    paragraphs: data.paragraphs,
    lines: data.lines,
    images: Object.values(data.images),
  };
};

export { definitionParagraphs, importParagraphs };
