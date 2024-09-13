const definitionInfo = {
  name: 'info',
  fields: [
    {
      name: 'id',
      type: 'VARCHAR(255)',
      primary: true,
    },
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'description',
      type: 'text',
    },
  ],
};

const importInfo = async (importUrl: string): Promise<ParsedResponse> => {
  const result = await fetch(importUrl);
  const json: Record<string, InfoData> = await result.json();
  return Object.keys(json).reduce(
    (acc: ParsedResponse, id) => {
      acc.info!.push({
        id,
        title: json[id].title,
        description: json[id].description,
      });
      return acc;
    },
    {
      info: [],
    },
  );
};

export { definitionInfo, importInfo };
