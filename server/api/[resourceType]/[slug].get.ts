import { ResourceInfo } from '~/data/enums';
import { Queries, Parsers } from '~/data/queries';

export default defineEventHandler(async event => {
  const client = getClient();
  const resourceType = getRouterParam(event, 'resourceType') as string;
  const slug = getRouterParam(event, 'slug') as string;
  const { table } = ResourceInfo[resourceType] ?? {};
  if (!table) {
    return null;
  }
  const query = {
    text: Queries[table],
    values: [slug],
  };
  const rows = (await client.query(query)).rows;
  const parser = Parsers[table] || Parsers.first;
  return parser(rows);
});
