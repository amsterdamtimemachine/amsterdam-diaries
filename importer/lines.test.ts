import { it, describe, expect } from 'vitest';
import { importLines } from './lines';
import expectedResults from './expectedResults/lines';
import expectedResultTest from './expectedResultTest';

const url = `https://raw.githubusercontent.com/amsterdamtimemachine/amsterdam-diaries-data/test/rdf/textual_annotations.jsonld`;

describe('Lines', async () => {
  it('Should validate correctly', async () => {
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

  describe('importLines', async () => {
    const result = await importLines(url);
    expectedResultTest(result, expectedResults);
  });
});
