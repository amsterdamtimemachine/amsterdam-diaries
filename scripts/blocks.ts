const definitionBlocks = {
  name: 'block',
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
      name: 'type',
      type: 'text',
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

const importBlocks = async (importUrl: string): Promise<Record<string, any[]>> => {
  const result = await fetch(importUrl);
  const json = await result.json();
  const blocks = json.filter((data: any) => {
    return data.textGranularity === 'block';
  });

  const data = blocks.reduce(
    (acc: any, block: any) => {
      // Define the block type
      const type = block.body?.[0]?.source?.label;

      // When it's not a Visual create lines
      if (type !== 'Visual') {
        const lines = block.items.map((item: any, index: number) => {
          return {
            id: item,
            blockId: block.id,
            position: index + 1,
          };
        });

        acc.lines.push(...lines);
      }

      // Parse the target for the image data
      const image = {
        id: block.target.source['@id'],
        contentUrl: block.target.source.contentUrl,
        thumbnailUrl: block.target.source.thumbnailUrl,
      };

      // Find the fragment selector
      const fragmentSelector = block.target.selector.find((selector: any) => {
        return selector.type === 'FragmentSelector';
      });

      // Update the accumulator and return it
      acc.blocks.push({
        id: block.id,
        type,
        imageId: image.id,
        dimensions: fragmentSelector.value,
      });
      acc.images[image.id] = image;
      return acc;
    },
    {
      blocks: [],
      lines: [],
      images: {},
    },
  );
  return {
    blocks: data.blocks,
    lines: data.lines,
    images: Object.values(data.images),
  };
};

export { definitionBlocks, importBlocks };
