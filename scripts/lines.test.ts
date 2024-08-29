import { it, describe, expect } from 'vitest';
import { importLines } from './lines';

const url = 'http://localhost:3000/testdata/lines.jsonld';

describe('Lines', async () => {
  it('should pass validation', async () => {
    const result = await (await fetch(url)).json();
    const allowedKeys = ['@context', 'id', 'type', 'textGranularity', 'body', 'target'];
    const blocks = result.filter((data: any) => data.textGranularity === 'line');

    // Top level check
    blocks.forEach((block: any) => {
      const topKeys = Object.keys(block);
      expect(topKeys.every(key => allowedKeys.includes(key))).toBe(true);

      // Check items
      expect(Array.isArray(block.items)).toBe(false);

      // Check body
      expect(Array.isArray(block.body)).toBe(true);
      expect(block.body.length).toBe(1);

      // Check target
      expect(Object.keys(block.target)).toEqual(['type', 'source', 'selector']);
      expect(Object.keys(block.target.source)).toEqual(['@id', 'type', 'name', 'contentUrl', 'thumbnailUrl']);
      block.target.selector.forEach((selector: any) => {
        expect(Object.keys(selector)).toEqual(['type', 'value', 'conformsTo']);
      });
    });
  });

  it('should parse correctly', async () => {
    const result = await importLines(url);
    expect(result).toEqual([
      {
        id: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/regions/0003_urn-gvn-EVDO01-IIAV002_IAV001000041-large_03/r-r_tl_2',
        value: 'De gemeenste dingen',
      },
      {
        id: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/regions/0003_urn-gvn-EVDO01-IIAV002_IAV001000041-large_03/r-r_tl_1',
        value: 'zeiden ze tegen',
      },
    ]);
  });
});
