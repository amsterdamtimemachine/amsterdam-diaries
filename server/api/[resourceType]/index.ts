import { getClient } from '#imports';
import { ValidResources } from '~/data/enums';

export default defineEventHandler(async event => {
  const client = getClient();
  const resourceType = getRouterParam(event, 'resourceType') as string;
  const resourceLimit = getQuery(event).limit as string;
  const offset = getQuery(event).offset as string;

  if (!Object.values(ValidResources).includes(resourceType)) {
    return [];
  }
  const resources = await client.query(
    `SELECT * FROM ${resourceType} ORDER BY name LIMIT ${resourceLimit || 0} OFFSET ${offset || 0}`,
  );
  return resources.rows;
});
