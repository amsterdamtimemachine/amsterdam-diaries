const definitionParagraphs = {
  name: 'paragraph',
  fields: [
    {
      name: 'id',
      type: 'text',
      primary: true
    },
    {
      name: 'parentId',
      type: 'text',
      foreign: 'entry'
    },
    {
      name: 'position',
      type: 'integer'
    },
    {
      name: 'imageId',
      type: 'text'
    },
    {
      name: 'imageUrl',
      type: 'text'
    },
    {
      name: 'dimensions',
      type: 'text'
    }
  ],
};

export { definitionParagraphs };
