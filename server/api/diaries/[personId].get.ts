const fetchAndParsePages = async (diaryId: string) => {
  const config = useRuntimeConfig();
  const uri = `${config.app.getEntriesOfDiaryUri}?diary=${diaryId}`;
  const json = await useCompactJson('entriesOfDiary', uri);
  const pages = Array.isArray(json['@graph']) ? json['@graph'] : [json];
  const result = [];
  for (let idx = 0; idx < pages.length; ++idx) {
    const page = pages[idx];
    result.push({
      ...page,
      id: useSimplifyId(page.id as string),
    });
  }
  return result;
};

const fetchAndParseDiaries = async (id: string) => {
  const config = useRuntimeConfig();
  const uri = `${config.app.getDiariesOfAuthorUri}?person=${id}`;
  const json = await useCompactJson('diariesOfAuthor', uri);
  const diaries = Array.isArray(json['@graph']) ? json['@graph'] : [json];
  const result = [];

  for (let idx = 0; idx < diaries.length; ++idx) {
    const diary = diaries[idx];
    result.push({
      ...diary,
      id: useSimplifyId(diary.id as string),
      pages: await fetchAndParsePages(diary.id as string),
    });
  }

  return result;
};

// TODO: Add caching
export default defineEventHandler(async event => {
  const config = useRuntimeConfig();
  const personId = getRouterParam(event, 'personId');
  const id = `${config.app.personBaseUri}${personId}`;

  try {
    const diaries = await fetchAndParseDiaries(id);
    return { diaries };
  } catch (e) {
    console.error('Error: ', e);
    setResponseStatus(event, 400);
  }
});
