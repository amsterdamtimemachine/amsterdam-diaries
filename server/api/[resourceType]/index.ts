import { ResourceInfo } from '~/data/enums';
import { Parsers, Queries } from '~/data/queries';

export default defineEventHandler(async event => {
  const client = getClient();
  const resourceType = getRouterParam(event, 'resourceType') as string;
  const limit = getQuery(event).limit as string;
  const offset = getQuery(event).offset as string;
  const { table } = ResourceInfo[resourceType] ?? {};
  if (!table) {
    return [];
  }
  const query = {
    text: Queries[`${table}List`],
    values: [limit, offset],
  };
  const rows = (await client.query(query)).rows;
  const parser = Parsers[`${table}List`] || Parsers.list;
  return parser(rows);
});
