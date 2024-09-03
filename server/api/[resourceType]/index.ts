import { getClient } from '#imports';
import useCapitalize from '~/composables/useCapitalize';
import { ValidResources } from '~/data/enums';

export default defineEventHandler(async event => {
  const client = getClient();
  const resourceType = getRouterParam(event, 'resourceType') as string;
  const resourceLimit = getQuery(event).limit as string;
  const offset = getQuery(event).offset as string;

  if (!Object.values(ValidResources).includes(resourceType)) {
    return [];
  }
  const query = {
    text: `SELECT * FROM Resource WHERE type=$1 ORDER BY name LIMIT $2 OFFSET $3`,
    values: [useCapitalize(resourceType), resourceLimit, offset],
  };
  return (await client.query(query)).rows;
});
