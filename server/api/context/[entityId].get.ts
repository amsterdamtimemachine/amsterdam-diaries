export default defineEventHandler(async event => {
  try {
    const entityId = getRouterParam(event, 'entityId') as string;
    const id = atob(entityId);
    const authorNames = [] as string[];
    const data = (await useFetchGraph('getEntityAnnotation', id)) as Annotation[];
    const annotations: EntityContext[] = [];

    for (let i = 0; i < data.length; ++i) {
      const anno = await useParseAnnotation(data[i]);
      (anno || []).forEach(a => {
        if (a.author?.name && !authorNames.includes(a.author.name)) {
          authorNames.push(a.author.name);
          annotations.push({
            ...a,
            type: 'Annotation',
            id: useSimplifyId(a.source),
            subType: a.type,
          });
        }
      });
    }
    return { annotations: annotations.slice(0, 6) };
  } catch (e) {
    console.error('Error: ', e);
    setResponseStatus(event, 400);
  }
});
