import { it, describe, expect } from 'vitest';
import { importEntries } from './entries';

const url = 'http://localhost:3000/testdata/entries.jsonld';

describe('Entries', async () => {
  it('should pass validation', async () => {
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
      const allowedBookKeys = ['@context', '@id', '@type', 'isPartOf', 'text', 'name', 'dateCreated', 'target'];
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

  it('should parse correctly', async () => {
    const result = await importEntries(url);
    expect(result).toEqual({
      entries: [
        {
          id: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/entries/66',
          bookId: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/diaries/1',
          name: 'Een Woord Tot de Jongeren',
          dateCreated: '1940',
        },
      ],
      paragraphs: [
        {
          id: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/regions/0002_urn-gvn-EVDO01-VMA01_KBN007000011-large_002/r_429',
          entryId: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/entries/66',
          position: 1,
        },
        {
          id: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/regions/0002_urn-gvn-EVDO01-VMA01_KBN007000011-large_002/r_438',
          entryId: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/entries/66',
          position: 2,
        },
        {
          id: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/regions/0002_urn-gvn-EVDO01-VMA01_KBN007000011-large_002/r_484',
          entryId: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/entries/66',
          position: 3,
        },
        {
          id: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/regions/0002_urn-gvn-EVDO01-VMA01_KBN007000011-large_002/r_475',
          entryId: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/entries/66',
          position: 4,
        },
        {
          id: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/regions/0002_urn-gvn-EVDO01-VMA01_KBN007000011-large_002/r_493',
          entryId: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/entries/66',
          position: 5,
        },
        {
          id: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/regions/0002_urn-gvn-EVDO01-VMA01_KBN007000011-large_002/r_502',
          entryId: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/entries/66',
          position: 6,
        },
        {
          id: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/regions/0002_urn-gvn-EVDO01-VMA01_KBN007000011-large_002/r_511',
          entryId: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/entries/66',
          position: 7,
        },
      ],
    });
  });
});
