/**
 * Public Methods
 */
const definitionLines = {
  name: 'line',
  fields: [
    {
      name: 'id',
      type: 'VARCHAR(255)',
      primary: true,
    },
    {
      name: 'block_id',
      type: 'VARCHAR(255)',
      foreign: 'block',
    },
    {
      name: 'position',
      type: 'INT',
    },
    {
      name: 'value',
      type: 'TEXT',
    },
  ],
};

const importLines = async (importUrl: string): Promise<ParsedResponse> => {
  const result = await fetch(importUrl);
  const json = (await result.json()) as RawLine[];
  const lines = json.filter((data: RawLine) => data.textGranularity === 'line');
  return {
    line: lines.map((line: RawLine) => {
      return {
        id: line.id,
        value: line.body[0].value,
      };
    }),
  };
};

export { definitionLines, importLines };
