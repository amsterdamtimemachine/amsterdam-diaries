export default defineEventHandler(async event => {
  try {
    const config = useRuntimeConfig();
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
      return newAuthor;
    });
    return { authors };
  } catch (e) {
    console.error('Error: ', e);
    setResponseStatus(event, 400);
  }
});
