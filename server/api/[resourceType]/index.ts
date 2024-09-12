import { ResourceInfo } from '~/data/enums';
import { Parsers, Queries } from '~/data/queries';
import Database from '~/server/utils/database';

export default defineEventHandler(async event => {
  const client = Database.getInstance();
  const resourceType = getRouterParam(event, 'resourceType') as string;
  const limit = getQuery(event).limit as string;
  const offset = getQuery(event).offset as string;
  const { table } = ResourceInfo[resourceType] ?? {};
  if (!table) {
    return [];
  }
  const rows = (await client.query(Queries[`${table}List`], [limit, offset])).rows;
  const parser = Parsers[`${table}List`] || Parsers.list;
  return parser(rows);
});
