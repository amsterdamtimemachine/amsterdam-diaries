import Database from '~/server/utils/database';

export default defineEventHandler(async (event): Promise<InfoData> => {
  const client = Database.getInstance();
  const { type } = getQuery(event);
  const info = await client.query(`SELECT * FROM info WHERE id = ?`, [type]);
  return info[0] as InfoData;
});
