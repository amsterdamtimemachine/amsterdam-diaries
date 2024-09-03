import { getClient } from '#imports';
import useCapitalize from '~/composables/useCapitalize';
import { ValidResources } from '~/data/enums';

export default defineEventHandler(async event => {
  const client = getClient();
  const resourceType = getRouterParam(event, 'resourceType') as string;
  if (!Object.values(ValidResources).includes(resourceType)) {
    return [];
  }
  const resources = await client.query(`SELECT COUNT(*) FROM Resource WHERE type=$1`, [useCapitalize(resourceType)]);
  return resources.rows[0].count;
});
