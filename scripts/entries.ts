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

const importEntries = async (importUrl: string) => {
  const result = await fetch(importUrl);
  const json = await result.json();
  console.warn(json);
};

export { definitionEntries, importEntries };
