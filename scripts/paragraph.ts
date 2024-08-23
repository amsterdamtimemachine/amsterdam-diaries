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
  ],
};

export { definitionParagraphs };
