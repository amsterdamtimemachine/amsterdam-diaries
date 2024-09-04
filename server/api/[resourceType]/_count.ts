import { ValidResources } from '~/data/enums';
import { Queries } from '~/data/queries';

export default defineEventHandler(async event => {
  const client = getClient();
  const resourceType = getRouterParam(event, 'resourceType') as string;
  if (!Object.values(ValidResources).includes(resourceType)) {
    return [];
  }
  const resources = await client.query(Queries[`${resourceType}Count`]);
  return resources.rows[0].count;
});
