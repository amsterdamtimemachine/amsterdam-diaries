import { getClient } from '#imports';
import { ValidResources } from '~/data/enums';
import { Queries, Parsers } from '~/data/queries';

export default defineEventHandler(async event => {
  const client = getClient();
  const resourceType = getRouterParam(event, 'resourceType') as string;
  if (!Object.values(ValidResources).includes(resourceType)) {
    return null;
  }
  const text = Queries[resourceType];
  const slug = getRouterParam(event, 'resource') as string;
  const query = {
    text,
    values: [slug],
  };
  const rows = (await client.query(query)).rows;
  const parser = Parsers[resourceType] || Parsers.first;
  return parser(rows);
});
