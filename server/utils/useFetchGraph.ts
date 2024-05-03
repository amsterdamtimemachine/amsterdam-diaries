export default async (type: FrameIds, id?: string) => {
  const config = useRuntimeConfig();
  const supportedQueries = {
    getAnnotation: `${config.app.getAnnotationsUri}?entry=${id}`,
    getEntityAnnotation: `${config.app.getEntityAnnotationsUri}?entity=${id}`,
    getConceptAnnotation: `${config.app.getConceptAnnotationsUri}?concept=${config.app.conceptBaseUri}${id}`,
    diariesOfAuthor: `${config.app.getDiariesOfAuthorUri}?person=${id}`,
    entriesOfDiary: `${config.app.getEntriesOfDiaryUri}?diary=${id}`,
    locationsPerAuthor: `${config.app.getLocationsPerAuthorUri}?author=${id}`,
  } as Record<FrameIds, string>;

  const json = await useCompactJson(type, supportedQueries[type]);
  return Array.isArray(json['@graph']) ? json['@graph'] : [json];
};
