import { getClient } from '#imports';

export default defineEventHandler(async () => {
  const client = getClient();
  const dates = await client.query(
    `SELECT * FROM annotation WHERE type = 'Date' AND value ~ '^\\d{4}-\\d{2}-\\d{2}$';`,
  );
  // Remove duplicates
  return dates.rows
    .filter((date, index, self) => self.findIndex(d => d.value === date.value) === index)
    .map(date => ({
      id: date.id,
      value: date.value,
    }));
});
