export default defineEventHandler(async event => {
  const items = await getCache('books');
  if (items) {
    return items;
  }

  try {
    const config = useRuntimeConfig();
    const json = await useCompactJson('diary', config.app.getAllDiaries);
    // @ts-expect-error Weird context thing
    const books = json['@graph'].map((book: Book) => {
      // Store the orginal bookId
      const originalId = book.id;

      // Change the id to the simplified version
      const newBook: Book = {
        id: useSimplifyId(book.id),
        type: 'Book',
        name: book.name,
        description: book.description,
      };

      // parse the entries
      if (book.entries?.length) {
        newBook.entries = book.entries.map((entry: EntryRef) => {
          return { ...entry, id: useSimplifyId(entry.id) };
        });
      }

      // Store it in the cache
      useStorage('books').setItem(originalId, newBook);

      // Return the new Book
      return newBook;
    });
    return { books };
  } catch (e) {
    console.error('Error: ', e);
    setResponseStatus(event, 400);
  }
});
