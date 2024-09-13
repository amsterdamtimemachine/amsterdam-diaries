const definitionImages = {
  name: 'image',
  fields: [
    {
      name: 'id',
      type: 'VARCHAR(255)',
      primary: true,
    },
    {
      name: 'content_url',
      type: 'TEXT',
    },
    {
      name: 'thumbnail_url',
      type: 'TEXT',
    },
  ],
};

export { definitionImages };
