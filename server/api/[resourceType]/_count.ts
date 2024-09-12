import { ResourceInfo } from '~/data/enums';
import { Queries } from '~/data/queries';
import Database from '~/server/utils/database';

export default defineEventHandler<Promise<number>>(async event => {
  const client = Database.getInstance();
  const resourceType = getRouterParam(event, 'resourceType') as string;
  const { table } = ResourceInfo[resourceType] ?? {};
  if (!table) {
    return 0;
  }
  const resources = await client.query(Queries[`${table}Count`]);
  return resources.rows[0].count;
});
