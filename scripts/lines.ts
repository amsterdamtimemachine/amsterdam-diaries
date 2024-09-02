const definitionLines = {
  name: 'line',
  fields: [
    {
      name: 'id',
      type: 'text',
      primary: true,
    },
    {
      name: 'blockId',
      type: 'text',
      foreign: 'block',
    },
    {
      name: 'position',
      type: 'integer',
    },
    {
      name: 'value',
      type: 'text',
    },
  ],
};

const importLines = async (importUrl: string) => {
  const result = await fetch(importUrl);
  const json = await result.json();
  const lines = json.filter((data: any) => data.textGranularity === 'line');
  return lines.map((line: any) => {
    return {
      id: line.id,
      value: line.body[0].value,
    };
  });
};

export { definitionLines, importLines };
