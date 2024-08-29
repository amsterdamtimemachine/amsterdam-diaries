import { getClient } from '#imports';
import { ValidResources } from '~/data/enums';

export default defineEventHandler(async event => {
  const client = getClient();
  const resourceType = getRouterParam(event, 'resourceType') as string;
  if (!Object.values(ValidResources).includes(resourceType)) {
    return null;
  }
  const slug = getRouterParam(event, 'resource') as string;
  const resource = await client.query(`SELECT * FROM ${resourceType} WHERE slug = $1`, [slug]);
  return resource.rows[0];
});
