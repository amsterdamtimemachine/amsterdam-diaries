export const Queries: Record<string, string> = {
  authorList: `SELECT a.id,
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
           ORDER BY name LIMIT $1 OFFSET $2`,
  author: `SELECT a.id,
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
           WHERE a.slug = $1`,
  diaryList: `SELECT a.id,
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
           LEFT JOIN resource r2 ON a.deathplaceid = r2.id`,
  diary: `SELECT a.id,
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
           WHERE a.slug = $1`,
  organizationList: `SELECT * FROM resource WHERE type='Organization' ORDER BY name LIMIT $1 OFFSET $2`,
  organization: `SELECT * FROM resource WHERE type='Organization' AND slug=$1`,
  personList: `SELECT * FROM resource WHERE type='Person' ORDER BY name LIMIT $1 OFFSET $2`,
  person: `SELECT * FROM resource WHERE type='Person' AND slug=$1`,
  conceptList: `SELECT * FROM concept ORDER BY name LIMIT $1 OFFSET $2`,
  concept: `SELECT * FROM concept WHERE slug=$1`,
  authorCount: `SELECT COUNT(*) FROM author`,
  organizationCount: `SELECT COUNT(*) FROM resource WHERE type='Organization'`,
  personCount: `SELECT COUNT(*) FROM resource WHERE type='Person'`,
  conceptCount: `SELECT COUNT(*) FROM concept`,
} as const;

export const Parsers: Record<string, (row: any) => any> = {
  authorList: (rows: any[]) => {
    return rows.map(author => {
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
        image: author.imageid,
      };
    });
  },
  author: (rows: any[]) => {
    const author = rows[0];
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
      image: author.imageid,
    };
  },
  diaries: () => {},
  diary: () => {},
  first: (rows: any[]) => rows[0],
  list: (rows: any[]) => rows,
} as const;
