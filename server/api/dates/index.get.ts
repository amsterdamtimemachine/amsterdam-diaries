import Database from '~/server/utils/database';

export default defineEventHandler(async (): Promise<DateData[]> => {
  const client = Database.getInstance();
  const dates = await client.query(
    `SELECT * FROM annotation WHERE type = 'Date' AND correction REGEXP '^[0-9]{4}-[0-9]{2}-[0-9]{2}$' ORDER BY correction;`,
  );
  // Remove duplicates
  return dates
    .filter((date, index, self) => self.findIndex(d => d.correction === date.correction) === index)
    .map(date => ({
      id: date.id,
      value: date.correction,
    }));
});
