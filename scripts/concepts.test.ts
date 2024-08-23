import { it, describe, expect } from 'vitest';
import { importConcepts } from './concepts';

describe('Concepts', async () => {
  it('should pass validation', async () => {
    const url = 'http://localhost:3000/testdata/concepts.jsonld';
    const result = await fetch(url);
    const concepts = await result.json();

    concepts.forEach((concept: any) => {
      // Validate the top level structure
      expect(Object.keys(concept)).toEqual(['@context', 'id', 'type', 'label', 'prefLabel', 'notation', 'closeMatch']);
      expect(Object.keys(concept.prefLabel)).toEqual(['@language', '@value']);
      expect(Array.isArray(concept.closeMatch)).toBe(true);
    });
  });

  it('should parse correctly', async () => {
    const result = await importConcepts('http://localhost:3000/testdata/concepts.jsonld');
    expect(result).toEqual([
      {
        id: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/tags/concepts/atm_food',
        name: 'Etenswaren',
        slug: 'etenswaren',
      },
    ]);
  });
});
