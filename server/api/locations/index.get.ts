const withinBounds = (data?: AnnotationRef): boolean => {
  const bounds = useRuntimeConfig().app.maxBounds;

  return (
    Number(data?.latitude) >= bounds[1][0] &&
    Number(data?.latitude) <= bounds[0][0] &&
    Number(data?.longitude) >= bounds[1][1] &&
    Number(data?.longitude) <= bounds[0][1]
  );
};

const fetchAndParseLocations = async (id: string): Promise<LocationRef[]> => {
  const items = await useFetchGraph('locationsPerAuthor', id);
  const locations: LocationRef[] = [];

  for (let idx = 0; idx < items.length; ++idx) {
    const annotations = await useParseAnnotation(items[idx] as Annotation);
    if (annotations) {
      annotations.forEach((annotation: AnnotationRef) => {
        if (withinBounds(annotation)) {
          locations.push({
            id: btoa(annotation.value),
            name: annotation.name,
            latitude: annotation.latitude,
            longitude: annotation.longitude,
          });
        }
      });
    }
  }
  return locations;
};

export default defineEventHandler(async event => {
  const config = useRuntimeConfig();

  // Fetch the Authors, throw error when not found
  const result: { authors: Author[] } = await $fetch('/api/authors');
  if (!result?.authors) {
    console.error('Error: no authors found');
    setResponseStatus(event, 404);
  }

  // Parse the location for each author
  const locations: LocationRef[][] = [];
  for (const author of result.authors) {
    locations.push(await fetchAndParseLocations(`${config.app.entityBaseUri}${author.id}`));
  }

  // Return the locations
  // Only include unique locations
  return {
    locations: locations.flat().filter((value, index, self) => index === self.findIndex(obj => obj.id === value.id)),
  };
});
