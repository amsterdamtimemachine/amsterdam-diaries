const fetchLocations = async () => {
  const client = getClient();
  const query = {
    text: `SELECT DISTINCT(r.id),
                  r.name,
                  r.description,
                  r.latitude,
                  r.longitude
           FROM annotation a
           LEFT JOIN resource r ON a.identifyingid = r.id
           WHERE a.type = 'Place'
           AND r.latitude >= $3
           AND r.latitude <= $1
           AND r.longitude >= $4
           AND r.longitude <= $2`,
    // Note: config.app.maxBounds has the wrong order of coordinates
    // this results in a very weird order of the placeholders in the query
    values: useRuntimeConfig().app.maxBounds.flat(),
  };
  return (await client.query(query)).rows as ParsedResource[];
};

export default defineEventHandler<Promise<LocationData[]>>(async () => {
  const data = await fetchLocations();
  return data.map((item: ParsedResource) => {
    return {
      id: btoa(item.id),
      name: item.name,
      description: item.description,
      latitude: item.latitude,
      longitude: item.longitude,
    } as LocationData;
  });
});
