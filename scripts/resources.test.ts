import { it, describe, expect } from 'vitest';
import { importResources } from './resources';

describe('resources', async () => {
  it('Can parse', async () => {
    const result = await importResources('http://localhost:3000/testdata/resources.jsonld');
    expect(result).toEqual({
      people: [
        {
          id: 'http://www.wikidata.org/entity/Q104369',
          name: 'Ernst Laqueur',
          description: 'Nederlands hoogleraar Farmacologie',
        },
      ],
      organizations: [
        {
          id: 'http://www.wikidata.org/entity/Q172579',
          name: 'Koninkrijk Italië',
          description: '1861–1946',
          latitude: 41.9,
          longitude: 12.5,
        },
      ],
      places: [
        {
          id: 'http://www.wikidata.org/entity/Q10041',
          name: 'Soest',
          description: 'gemeente in de provincie Utrecht, Nederland',
          latitude: 52.183333,
          longitude: 5.283333,
        },
      ],
    });
  });
});
