import { it, describe, expect } from 'vitest';
import { importResources } from './resources';
import expectedResults from './expectedResults/resources';

const url = `https://raw.githubusercontent.com/amsterdamtimemachine/amsterdam-diaries-data/test/rdf/external_resources.jsonld`;

describe('Resources', async () => {
  it('Should validate correctly', async () => {
    const result = await (await fetch(url)).json();
    const allowedKeys = ['@context', '@id', '@type', 'name', 'description', 'geo'];

    // To illustrate that importResources will filter some items
    expect(result.length).toBe(31);

    result.forEach((data: any) => {
      const topKeys = Object.keys(data);
      expect(topKeys.every(key => allowedKeys.includes(key))).toBe(true);

      if (data.geo) {
        expect(Object.keys(data.geo)).toEqual(['@type', 'latitude', 'longitude']);
      }
    });
  });

  describe('importResources', async () => {
    const result = await importResources(url);

    it(`Should return an array of ${expectedResults.length} resources`, async () => {
      expect(result.length).toBe(expectedResults.length);
    });

    result.forEach((resource, index) => {
      it(`Should parse resource #${index + 1} correctly`, async () => {
        expect(resource).toEqual(expectedResults[index]);
      });
    });
  });
});
