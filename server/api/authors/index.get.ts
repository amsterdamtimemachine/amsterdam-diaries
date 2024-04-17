export default defineEventHandler(async event => {
  const items = await getCache('authors');
  if (items) {
    return items;
  }

  try {
    const config = useRuntimeConfig();
    const json = await useCompactJson('authors', config.app.getAuthorsUri);
    return { authors: json['@graph'] };
  } catch (e) {
    console.error('Error: ', e);
    setResponseStatus(event, 400);
  }
});
