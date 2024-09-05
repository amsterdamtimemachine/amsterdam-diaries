import { it, describe, expect } from 'vitest';
import { importConcepts } from './concepts';
import expectedResults from './expectedResults/concepts';

const url = `https://raw.githubusercontent.com/amsterdamtimemachine/amsterdam-diaries-data/test/rdf/concepts.jsonld`;

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

    it('Should return an array of 1 concept', async () => {
      expect(result.length).toBe(1);
    });

    result.forEach((concept, index) => {
      it(`Should parse concept #${index + 1} correctly`, async () => {
        expect(concept).toEqual(expectedResults[index]);
      });
    });
  });
});
