import { it, describe, expect } from 'vitest';
import { importConcepts } from './concepts';
import expectedResults from './expectedResults/concepts';
import expectedResultTest from './expectedResultTest';

const url = `${process.env.IMPORT_URL}/concepts.jsonld`;

describe('Concepts', async () => {
  it('Should validate correctly', async () => {
    const result = await (await fetch(url)).json();
    const allowedKeys = ['@context', 'id', 'type', 'label', 'prefLabel', 'notation', 'closeMatch'];

    result.forEach((data: any) => {
      const topKeys = Object.keys(data);
      expect(topKeys.every(key => allowedKeys.includes(key))).toBe(true);

      if (data.prefLabel) {
        expect(Object.keys(data.prefLabel)).toEqual(['@language', '@value']);
      }
      if (data.closeMatch) {
        expect(Array.isArray(data.closeMatch)).toBe(true);
      }
    });
  });

  describe('importConcepts', async () => {
    const result = await importConcepts(url);
    expectedResultTest(result, expectedResults);
  });
});
