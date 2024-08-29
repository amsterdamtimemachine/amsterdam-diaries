import { getClient } from '#imports';
import { ValidResources } from '~/data/enums';

export default defineEventHandler(async event => {
  const client = getClient();
  const resourceType = getRouterParam(event, 'resourceType') as string;
  if (!Object.values(ValidResources).includes(resourceType)) {
    return [];
  }
  const resources = await client.query(`SELECT COUNT(*) FROM ${resourceType}`);
  return resources.rows[0].count;
});
