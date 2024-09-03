const fetchDiaries = async (id: string) => {
  const client = getClient();
  const query = {
    text: `SELECT id,
                  name,
                  description,
                  temporalCoverage
           FROM book
           WHERE authorid = $1`,
    values: [id],
  };
  return (await client.query(query)).rows;
};

const fetchEntries = async (id: string) => {
  const client = getClient();
  const query = {
    text: `SELECT id,
                  name,
                  position,
                  dateCreated
           FROM entry
           WHERE bookid = $1`,
    values: [id],
  };
  return (await client.query(query)).rows;
};

export default defineEventHandler(async event => {
  const config = useRuntimeConfig();
  const personId = getRouterParam(event, 'personId');
  const id = `${config.app.entityBaseUri}${personId}`;

  try {
    const data = await fetchDiaries(id);
    const diaries = [];
    for (let idx = 0; idx < data.length; ++idx) {
      const pages = (await fetchEntries(data[idx].id)).sort((a, b) => a.position - b.position);
      diaries.push({
        id: useSimplifyId(data[idx].id),
        type: 'Book',
        temporalCoverage: data[idx].temporalcoverage,
        pages: pages.map(page => ({
          id: useSimplifyId(page.id),
          type: 'Manuscript',
          dateCreated: page.datecreated,
        })),
      });
    }

    return { diaries, my: 'error' };
  } catch (e) {
    console.error('Error: ', e);
    setResponseStatus(event, 400);
  }
});
