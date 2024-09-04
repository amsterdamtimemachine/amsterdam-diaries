import { ValidResources } from '~/data/enums';
import { Parsers, Queries } from '~/data/queries';

export default defineEventHandler(async event => {
  const client = getClient();
  const resourceType = getRouterParam(event, 'resourceType') as string;
  const resourceLimit = getQuery(event).limit as string;
  const offset = getQuery(event).offset as string;
  if (!Object.values(ValidResources).includes(resourceType)) {
    return [];
  }

  const text = Queries[`${resourceType}List`];
  const query = {
    text,
    values: [resourceLimit, offset],
  };
  const rows = (await client.query(query)).rows;
  const parser = Parsers[`${resourceType}List`] || Parsers.list;
  return parser(rows);
});
