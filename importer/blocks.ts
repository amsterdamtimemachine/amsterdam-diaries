const definitionBlocks = {
  name: 'block',
  fields: [
    {
      name: 'id',
      type: 'VARCHAR(255)',
      primary: true,
    },
    {
      name: 'entry_id',
      type: 'VARCHAR(255)',
      foreign: 'entry',
    },
    {
      name: 'position',
      type: 'INT',
    },
    {
      name: 'type',
      type: 'TEXT',
    },
    {
      name: 'image_id',
      type: 'VARCHAR(255)',
      foreign: 'image',
    },
    {
      name: 'dimensions',
      type: 'TEXT',
    },
  ],
};

const importBlocks = async (importUrl: string): Promise<ParsedResponse> => {
  const result = await fetch(importUrl);
  const json = await result.json();
  const blocks = json.filter((data: RawItem) => {
    return data.textGranularity === 'block';
  });

  const imageIdx: Record<string, ParsedImage> = {};
  return blocks.reduce(
    (acc: ParsedResponse, block: RawItem) => {
      // Define the block type
      const type = block.body?.[0]?.source?.label;

      // When it's not a Visual create lines
      if (type !== 'Visual') {
        const lines = block.items.map((item: any, index: number) => {
          return {
            id: item,
            block_id: block.id,
            position: index + 1,
          };
        });

        acc.line!.push(...lines);
      }

      // Parse the target for the image data
      const image = {
        id: block.target.source['@id'],
        content_url: block.target.source.contentUrl,
        thumbnail_url: block.target.source.thumbnailUrl,
      };

      // Find the fragment selector
      const fragmentSelector = block.target.selector.find((selector: any) => {
        return selector.type === 'FragmentSelector';
      });

      // Update the accumulator and return it
      acc.block!.push({
        id: block.id,
        type,
        image_id: image.id,
        dimensions: fragmentSelector.value?.replace('xywh=', ''),
      });
      // Try to update image index and then add it to the accumulator
      imageIdx[image.id] = image;
      acc.image = Object.values(imageIdx);
      return acc;
    },
    {
      image: [],
      block: [],
      line: [],
    },
  );
};

export { definitionBlocks, importBlocks };
