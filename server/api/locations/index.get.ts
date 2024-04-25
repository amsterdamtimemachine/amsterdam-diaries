const fetchAndParseLocations = async (id: string) => {
  const config = useRuntimeConfig();
  const uri = `${config.app.getLocationsPerAuthorUri}?author=${id}`;

  const json = await useCompactJson('locationsPerAuthor', uri);
  const result = [];
  if (Array.isArray(json['@graph'])) {
    for (let idx = 0; idx < json['@graph'].length; ++idx) {
      const annotation: { [key: string]: any } = json['@graph'][idx];
      result.push({
        annotation: annotation['body'],
        ...(annotation['body']['source'] as GeoSource),
      });
    }
  }
  return result;
};

const parseAuthors = async (authors: string[]) => {
  let results = [] as GeoSource[];

  for (const author of authors) {
    const locations = await fetchAndParseLocations(author);

    if (!locations.length) {
      continue;
    }

    results = results.concat(locations);
  }

  return results;
};

export default defineEventHandler(async event => {
  const { authors } = (await $fetch('/api/authors')) as { authors: Author[] };
  const config = useRuntimeConfig();

  const authorIds = authors.map(author => `${config.app.personBaseUri}${author.id}`);

  if (!authors) {
    console.error('Error: no authors found');
    setResponseStatus(event, 404);
  }

  const results = await parseAuthors(authorIds);

  return results;
});
