const fetchAndParseLocations = async (id: string, bounds: number[][]) => {
  const config = useRuntimeConfig();
  const uri = `${config.app.getLocationsPerAuthorUri}?author=${id}`;

  const json = await useCompactJson('locationsPerAuthor', uri);
  const result = [];
  if (Array.isArray(json['@graph'])) {
    for (let idx = 0; idx < json['@graph'].length; ++idx) {
      const annotation: { [key: string]: any } = json['@graph'][idx];

      const location = annotation['body']['source'] as GeoSource;

      // Check if the location is within the specified bounds (i.e. Amsterdam)
      const withinBounds =
        Number(location.geo.latitude) >= bounds[1][0] &&
        Number(location.geo.latitude) <= bounds[0][0] &&
        Number(location.geo.longitude) >= bounds[1][1] &&
        Number(location.geo.longitude) <= bounds[0][1];

      if (withinBounds) {
        result.push({
          annotation: annotation['body'],
          ...(annotation['body']['source'] as GeoSource),
        });
      }
    }
  }
  return result;
};

const parseAuthors = async (authors: string[], bounds: number[][]) => {
  let results = [] as GeoSource[];

  for (const author of authors) {
    const locations = await fetchAndParseLocations(author, bounds);

    if (!locations.length) {
      continue;
    }

    results = results.concat(locations);
  }

  return results;
};

export default defineEventHandler(async event => {
  const query = getQuery(event);
  const bounds = JSON.parse(query.bounds as string) as number[][];

  const { authors } = (await $fetch('/api/authors')) as { authors: Author[] };
  const config = useRuntimeConfig();

  const authorIds = authors.map(author => `${config.app.personBaseUri}${author.id}`);

  if (!authors) {
    console.error('Error: no authors found');
    setResponseStatus(event, 404);
  }

  const results = await parseAuthors(authorIds, bounds);

  return results;
});
