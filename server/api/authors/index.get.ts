/**
 * Database methods
 */
const fetchAuthors = async (slug?: string) => {
  const client = getClient();
  const query = {
    text: `SELECT a.id,
                  a.name,
                  a.description,
                  a.birthdate,
                  a.deathdate,
                  a.slug,
                  a.imageid,
                  r1.id as birthplaceid,
                  r1.name as birthplace,
                  r1.description as birthplacedescription,
                  r1.latitude as birthlat,
                  r1.longitude as birthlon,
                  r2.id as deathplaceid,
                  r2.name as deathplace,
                  r2.description as deathplacedescription,
                  r2.latitude as deathlat,
                  r2.longitude as deathlon
           FROM author a
           LEFT JOIN resource r1 ON a.birthplaceid = r1.id
           LEFT JOIN resource r2 ON a.deathplaceid = r2.id
           ${slug ? 'WHERE a.slug = $1' : ''}`,
    values: [slug],
  };
  return (await client.query(query)).rows;
};

export default defineEventHandler(async event => {
  try {
    const query = getQuery(event);
    const authors = (await fetchAuthors(query.slug as string)).map(author => {
      return {
        id: useSimplifyId(author.id),
        type: 'Person',
        birthDate: author.birthdate,
        birthPlace: {
          id: author.birthplaceid,
          type: 'Place',
          name: author.birthplace,
          latitude: author.birthlat,
          longitude: author.birthlon,
        },
        deathDate: author.deathdate,
        deathPlace: {
          id: author.deathplaceid,
          type: 'Place',
          name: author.deathplace,
          latitude: author.deathlat,
          longitude: author.deathlon,
        },
        description: author.description,
        name: author.name,
        slug: author.slug,
      };
    });

    return { authors };
  } catch (e) {
    console.error('Error: ', e);
    setResponseStatus(event, 400);
  }
});
