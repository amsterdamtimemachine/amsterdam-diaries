const definitionEntries = {
  name: 'entry',
  fields: [
    {
      name: 'id',
      type: 'text',
      primary: true,
    },
    {
      name: 'bookId',
      type: 'text',
      foreign: 'book',
    },
    {
      name: 'position',
      type: 'integer',
    },
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'dateCreated',
      type: 'text',
    },
  ],
};

export { definitionEntries };
