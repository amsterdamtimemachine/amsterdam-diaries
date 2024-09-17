import { it, describe, expect } from 'vitest';
import { importBlocks } from './blocks';
import expectedResults from './expectedResults/blocks';
import expectedResultTest from './expectedResultTest';

const url = `https://raw.githubusercontent.com/amsterdamtimemachine/amsterdam-diaries-data/test/rdf/textual_annotations.jsonld`;

describe('Blocks', async () => {
  it('Should validate correctly', async () => {
    const result = await (await fetch(url)).json();
    const blocks = result.filter((data: any) => data.textGranularity === 'block');
    const blockKeys = ['@context', 'id', 'type', 'textGranularity', 'items', 'body', 'target'];

    // Top level check
    blocks.forEach((block: any) => {
      const topKeys = Object.keys(block);
      expect(topKeys.every(key => blockKeys.includes(key))).toBe(true);

      // Check items
      expect(Array.isArray(block.items)).toBe(true);
      expect(block.items.length).toBeGreaterThan(0);

      // Check body
      expect(Array.isArray(block.body)).toBe(true);
      expect(block.body.length).toBe(1);

      // Check target
      expect(Object.keys(block.target)).toEqual(['id', 'type', 'source', 'selector']);
      expect(Object.keys(block.target.source)).toEqual(['@id', 'type', 'name', 'contentUrl', 'thumbnailUrl']);
      block.target.selector.forEach((selector: any) => {
        expect(Object.keys(selector)).toEqual(['type', 'value', 'conformsTo']);
      });
    });
  });

  describe('importBlocks', async () => {
    const result = await importBlocks(url);
    expectedResultTest(result, expectedResults);
  });
});
