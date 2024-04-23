export default defineEventHandler(async event => {
  const items = await getCache('authors');
  if (items) {
    return { authors: items };
  }

  try {
    const config = useRuntimeConfig();
    const storage = useStorage('authors');
    const json = await useCompactJson('authors', config.app.getAuthorsUri);
    // @ts-expect-error Object is possible 'undefined'
    const authors = json['@graph'].map(author => {
      const name = Array.isArray(author.name) ? author.name.pop()! : author.name;
      const newAuthor = {
        ...author,
        name,
        aliases: author.name,
        slug: useSlugify(name),
        id: useSimplifyId(author.id),
      };
      storage.setItem(author.id, newAuthor);
      return newAuthor;
    });
    return { authors };
  } catch (e) {
    console.error('Error: ', e);
    setResponseStatus(event, 400);
  }
});
