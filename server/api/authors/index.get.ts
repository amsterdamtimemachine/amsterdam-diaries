export default defineEventHandler(async event => {
  const items = await getCache('authors');
  if (items) {
    return items;
  }

  try {
    const config = useRuntimeConfig();
    const storage = useStorage('authors');
    const json = await useCompactJson('authors', config.app.getAuthorsUri);
    // @ts-expect-error Object is possible 'undefined'
    json['@graph'].forEach(author => storage.setItem(author.id, author));
    return { authors: json['@graph'] };
  } catch (e) {
    console.error('Error: ', e);
    setResponseStatus(event, 400);
  }
});
