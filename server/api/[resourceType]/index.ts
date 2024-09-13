import { ResourceInfo } from '~/data/enums';
import { Parsers, Queries } from '~/data/queries';
import Database from '~/server/utils/database';

export default defineEventHandler(async event => {
  const client = Database.getInstance();
  const resourceType = getRouterParam(event, 'resourceType') as string;
  const limit = parseInt(getQuery(event).limit as string, 10);
  const offset = parseInt(getQuery(event).offset as string, 10);
  const { table } = ResourceInfo[resourceType] ?? {};
  if (!table) {
    return [];
  }
  const rows = await client.query(Queries[`${table}List`], [limit, offset]);
  const parser = Parsers[`${table}List`] || Parsers.list;
  return parser(rows);
});
