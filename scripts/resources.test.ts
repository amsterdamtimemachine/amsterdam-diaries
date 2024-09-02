import { it, describe, expect } from 'vitest';
import { importResources } from './resources';

const url = 'http://localhost:3000/testdata/resources.jsonld';

describe('resources', async () => {
  it('should pass validation', async () => {
    const result = await (await fetch(url)).json();
    const allowedKeys = ['@context', '@id', '@type', 'name', 'description', 'geo'];

    result.forEach((data: any) => {
      const topKeys = Object.keys(data);
      expect(topKeys.every(key => allowedKeys.includes(key))).toBe(true);

      if (data.geo) {
        expect(Object.keys(data.geo)).toEqual(['@type', 'latitude', 'longitude']);
      }
    });
  });

  it('Can parse', async () => {
    const result = await importResources(url);
    expect(result).toStrictEqual([
      {
        id: 'http://www.wikidata.org/entity/Q10041',
        type: 'Place',
        name: 'Soest',
        slug: 'soest',
        description: 'gemeente in de provincie Utrecht, Nederland',
        latitude: 52.183333,
        longitude: 5.283333,
      },
      {
        id: 'http://www.wikidata.org/entity/Q104369',
        type: 'Person',
        name: 'Ernst Laqueur',
        slug: 'ernst-laqueur',
        description: 'Nederlands hoogleraar Farmacologie',
        latitude: undefined,
        longitude: undefined,
      },
      {
        id: 'http://www.wikidata.org/entity/Q172579',
        type: 'Organization',
        name: 'Koninkrijk Italië',
        slug: 'koninkrijk-italie',
        description: '1861–1946',
        latitude: 41.9,
        longitude: 12.5,
      },
    ]);
  });
});
