import Database from '~/server/utils/database';

const fetchLocations = async () => {
  const client = Database.getInstance();
  const query = `
    SELECT DISTINCT(r.id),
           r.name,
           r.description,
           r.latitude,
           r.longitude
    FROM annotation a
    LEFT JOIN resource r ON a.identifying_id = r.id
    WHERE a.type = 'Place'
    AND r.latitude <= ?
    AND r.longitude <= ?
    AND r.latitude >= ?
    AND r.longitude >= ?`;

  // Note: config.app.maxBounds has the wrong order of coordinates
  // this results in a very weird order in the query
  const values = useRuntimeConfig().app.maxBounds.flat();
  return (await client.query(query, values)) as ParsedResource[];
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
