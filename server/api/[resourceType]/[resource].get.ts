import { getClient } from '#imports';
import useCapitalize from '~/composables/useCapitalize';
import { ValidResources } from '~/data/enums';

export default defineEventHandler(async event => {
  const client = getClient();
  const resourceType = getRouterParam(event, 'resourceType') as string;
  if (!Object.values(ValidResources).includes(resourceType)) {
    return null;
  }
  const slug = getRouterParam(event, 'resource') as string;
  const query = {
    text: `SELECT * FROM Resource WHERE type=$1 AND slug=$2`,
    values: [useCapitalize(resourceType), slug],
  };
  return (await client.query(query)).rows[0];
});
