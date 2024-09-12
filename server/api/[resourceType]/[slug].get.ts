import { ResourceInfo } from '~/data/enums';
import { Queries, Parsers } from '~/data/queries';
import Database from '~/server/utils/database';

export default defineEventHandler(async event => {
  const client = Database.getInstance();
  const resourceType = getRouterParam(event, 'resourceType') as string;
  const slug = getRouterParam(event, 'slug') as string;
  const { table } = ResourceInfo[resourceType] ?? {};
  if (!table) {
    return null;
  }
  const rows = (await client.query(Queries[table], [slug])).rows;
  const parser = Parsers[table] || Parsers.first;
  return parser(rows);
});
