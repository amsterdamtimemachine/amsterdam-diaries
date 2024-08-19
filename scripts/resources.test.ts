import { it, describe, expect } from 'vitest';
import { importResources } from './resources';

describe('resources', async () => {
  it('Can parse', async () => {
    const result = await importResources('http://localhost:3000/testdata/resources.jsonld');
    // TODO: Fix this test
    expect(result).toEqual([{}]);
  });
});
