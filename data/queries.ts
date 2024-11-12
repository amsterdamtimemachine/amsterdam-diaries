export const Queries: Record<string, string> = {
  authorList: `SELECT DISTINCT(a.id),
                  a.name,
                  a.description,
                  a.birth_date,
                  a.death_date,
                  a.slug,
                  a.image_id,
                  r1.id as birth_place_id,
                  r1.name as birth_place,
                  r1.description as birth_place_description,
                  r1.latitude as birth_place_lat,
                  r1.longitude as birth_place_lon,
                  r2.id as death_place_id,
                  r2.name as death_place,
                  r2.description as death_place_description,
                  r2.latitude as death_place_lat,
                  r2.longitude as death_place_lon
           FROM author a
           INNER JOIN book b ON a.id = b.about_id
           LEFT JOIN resource r1 ON a.birth_place_id = r1.id
           LEFT JOIN resource r2 ON a.death_place_id = r2.id
           ORDER BY name LIMIT ? OFFSET ?`,
  author: `SELECT a.id,
                  a.name,
                  a.description,
                  a.birth_date,
                  a.death_date,
                  a.slug,
                  a.image_id,
                  r1.id as birth_place_id,
                  r1.name as birth_place,
                  r1.description as birth_place_description,
                  r1.latitude as birth_place_lat,
                  r1.longitude as birth_place_lon,
                  r2.id as death_place_id,
                  r2.name as death_place,
                  r2.description as death_place_description,
                  r2.latitude as death_place_lat,
                  r2.longitude as death_place_lon
           FROM author a
           LEFT JOIN resource r1 ON a.birth_place_id = r1.id
           LEFT JOIN resource r2 ON a.death_place_id = r2.id
           WHERE a.slug = ?`,
  diaryList: `SELECT a.id,
                  a.name,
                  a.description,
                  a.birth_date,
                  a.death_date,
                  a.slug,
                  a.image_id,
                  r1.id as birth_place_id,
                  r1.name as birth_place,
                  r1.description as birth_place_description,
                  r1.latitude as birth_place_lat,
                  r1.longitude as birth_place_lon,
                  r2.id as death_place_id,
                  r2.name as death_place,
                  r2.description as death_place_description,
                  r2.latitude as death_place_lat,
                  r2.longitude as death_place_lon
           FROM author a
           LEFT JOIN resource r1 ON a.birth_place_id = r1.id
           LEFT JOIN resource r2 ON a.death_place_id = r2.id`,
  diary: `SELECT a.id,
                  a.name,
                  a.description,
                  a.birth_date,
                  a.death_date,
                  a.slug,
                  a.image_id,
                  r1.id as birth_place_id,
                  r1.name as birth_place,
                  r1.description as birth_place_description,
                  r1.latitude as birth_place_lat,
                  r1.longitude as birth_place_lon,
                  r2.id as death_place_id,
                  r2.name as death_place,
                  r2.description as death_place_description,
                  r2.latitude as death_place_lat,
                  r2.longitude as death_place_lon
           FROM author a
           LEFT JOIN resource r1 ON a.birth_place_id = r1.id
           LEFT JOIN resource r2 ON a.death_place_id = r2.id
           WHERE a.slug = ?`,
  organizationList: `SELECT * FROM resource WHERE type = 'Organization' ORDER BY name LIMIT ? OFFSET ?`,
  organization: `SELECT * FROM resource WHERE type = 'Organization' AND slug = ?`,
  personList: `SELECT * FROM resource WHERE type = 'Person' ORDER BY name LIMIT ? OFFSET ?`,
  person: `SELECT * FROM resource WHERE type = 'Person' AND slug=?`,
  conceptList: `SELECT * FROM concept ORDER BY name LIMIT ? OFFSET ?`,
  concept: `SELECT * FROM concept WHERE slug = ?`,
  authorCount: `SELECT COUNT(DISTINCT(a.id)) as total FROM author a INNER JOIN book b ON a.id = b.about_id`,
  organizationCount: `SELECT COUNT(*) as total FROM resource WHERE type = 'Organization'`,
  personCount: `SELECT COUNT(*) as total FROM resource WHERE type = 'Person'`,
  conceptCount: `SELECT COUNT(*) as total FROM concept`,
} as const;

export const Parsers: Record<string, (row: any) => any> = {
  authorList: (rows: any[]): Author[] => {
    return rows.map(author => {
      return {
        id: useSimplifyId(author.id),
        type: 'Person',
        birthDate: author.birth_date,
        birthPlace: {
          id: author.birth_place_id,
          type: 'Place',
          name: author.birth_place,
          latitude: author.birth_place_lat,
          longitude: author.birth_place_lon,
        },
        deathDate: author.death_date,
        deathPlace: {
          id: author.death_place_id,
          type: 'Place',
          name: author.death_place,
          latitude: author.death_place_lat,
          longitude: author.death_place_lon,
        },
        description: author.description,
        name: author.name,
        slug: author.slug,
        image: author.image_id,
      };
    });
  },
  author: (rows: any[]): Author => {
    const author = rows[0];
    return {
      id: useSimplifyId(author.id),
      type: 'Person',
      birthDate: author.birth_date,
      birthPlace: {
        id: author.birth_place_id,
        type: 'Place',
        name: author.birth_place,
        latitude: author.birth_place_lat,
        longitude: author.birth_place_lon,
      },
      deathDate: author.death_date,
      deathPlace: {
        id: author.death_place_id,
        type: 'Place',
        name: author.death_place,
        latitude: author.death_place_lat,
        longitude: author.death_place_lon,
      },
      description: author.description,
      name: author.name,
      slug: author.slug,
      image: author.image_id,
    };
  },
  diaries: () => {},
  diary: () => {},
  first: (rows: any[]) => rows[0],
  list: (rows: any[]) => rows,
} as const;
