import { it, describe, expect } from 'vitest';
import { importEntries } from '../src/entries';
import expectedResults from './expectedResults/entries';
import expectedResultTest from './expectedResultTest';

const url = `https://raw.githubusercontent.com/amsterdamtimemachine/amsterdam-diaries-data/test/rdf/metadata.jsonld`;

describe('Entries', async () => {
  it('Should validate correctly', async () => {
    const result = await (await fetch(url)).json();
    const manuscripts = result.filter((data: any) => data.body?.[0]['@type'] === 'Manuscript');
    manuscripts.forEach((manuscript: any) => {
      // Check top level
      expect(Object.keys(manuscript)).toEqual(['@context', 'id', 'motivation', 'type', 'body', 'target']);

      // Book annotation should only contain 1 body
      expect(manuscript.body.length).toBe(1);

      // Check targets
      expect(Array.isArray(manuscript.target)).toBe(true);
      expect(manuscript.target.length).toBeGreaterThan(0);
      expect(manuscript.target.every((target: any) => typeof target === 'string')).toBe(true);

      // Check book definition
      // Since some keys are optional, check if the keys we have are expected
      const bookDefinition = manuscript.body[0];
      const allowedBookKeys = ['@context', '@id', '@type', 'isPartOf', 'text', 'name', 'dateCreated', 'hasPart'];
      expect(Object.keys(bookDefinition).every(key => allowedBookKeys.includes(key))).toBe(true);

      // Check the text
      expect(Array.isArray(bookDefinition.text)).toBe(true);
      expect(manuscript.target.length).toBeGreaterThanOrEqual(0);

      // Check if the isPart of is correctly formatted
      expect(Object.keys(bookDefinition.isPartOf)).toEqual(['@id', '@type']);

      // If dateCreated was defined, check if it is correctly formatted
      if (bookDefinition.dateCreated) {
        expect(Object.keys(bookDefinition.dateCreated)).toEqual(['@type', '@value']);
      }
    });
  });

  describe('importEntries', async () => {
    const result = await importEntries(url);
    expectedResultTest(result, expectedResults);
  });
});
