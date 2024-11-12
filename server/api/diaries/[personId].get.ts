import Database from '~/server/utils/database';

const fetchDiaries = async (id: string) => {
  const client = Database.getInstance();
  const query = `
    SELECT id,
           name,
           description,
           temporal_coverage
    FROM book
    WHERE about_id = ?`;
  return await client.query(query, [id]);
};

const fetchEntries = async (id: string) => {
  const client = Database.getInstance();
  const query = `
    SELECT id,
           name,
           position,
           date_created
    FROM entry
    WHERE book_id = ?`;
  return await client.query(query, [id]);
};

export default defineEventHandler<Promise<DiaryData[]>>(async event => {
  const config = useRuntimeConfig();
  const personId = getRouterParam(event, 'personId');
  const id = `${config.app.entityBaseUri}${personId}`;

  try {
    const data = await fetchDiaries(id);
    const diaries = [] as DiaryData[];
    for (let idx = 0; idx < data.length; ++idx) {
      const pages = (await fetchEntries(data[idx].id)).sort((a, b) => a.position - b.position);
      diaries.push({
        id: useSimplifyId(data[idx].id),
        type: 'Book',
        temporalCoverage: data[idx].temporal_coverage as string,
        pages: pages.map(page => ({
          id: useSimplifyId(page.id),
          type: 'Manuscript',
          dateCreated: page.date_created as string,
          sections: [],
        })),
      });
    }

    return diaries;
  } catch (e) {
    console.error('Error: ', e);
    setResponseStatus(event, 400);
    return [];
  }
});
