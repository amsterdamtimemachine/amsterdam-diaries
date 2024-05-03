export default defineEventHandler(async event => {
  try {
    const theme = getRouterParam(event, 'theme') as string;
    const authorNames = [] as string[];
    const data = (await useFetchGraph('getConceptAnnotation', theme)) as Annotation[];
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
