const definitionLines = {
  name: 'line',
  fields: [
    {
      name: 'id',
      type: 'text',
      primary: true,
    },
    {
      name: 'paragraphId',
      type: 'text',
      foreign: 'paragraph',
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

export { definitionLines };
