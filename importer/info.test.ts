import { it, describe, expect } from 'vitest';
import { importInfo } from './info';
import expectedResultTest from './expectedResultTest';

const url = `${process.env.IMPORT_URL}/info.jsonld`;

describe('Info', async () => {
  it('Should validate correctly', async () => {
    const result = await (await fetch(url)).json();
    expect(Object.keys(result)).toEqual(['@context', '@graph']);
    expect(Array.isArray(result['@graph'])).toBe(true);

    // Check the items
    const keys = ['@id', '@type', 'name', 'description'];
    result['@graph'].forEach((data: any) => {
      expect(Object.keys(data)).toEqual(keys);
    });
  });

  describe('importInfo', async () => {
    const result = await importInfo(url);
    expectedResultTest(result, {
      info: ['id', 'description', 'title'],
    });
  });
});
