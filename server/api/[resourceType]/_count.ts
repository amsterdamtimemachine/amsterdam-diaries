import { ResourceInfo } from '~/data/enums';
import { Queries } from '~/data/queries';

export default defineEventHandler(async event => {
  const client = getClient();
  const resourceType = getRouterParam(event, 'resourceType') as string;
  const { table } = ResourceInfo[resourceType] ?? {};
  if (!table) {
    return 0;
  }
  const resources = await client.query(Queries[`${table}Count`]);
  return resources.rows[0].count;
});
