import { it, describe, expect } from 'vitest';
import { importConcepts } from './concepts';

describe('concepts', async () => {
  it ('Can parse', async () => {
    const result = await importConcepts('http://localhost:3000/testdata/concepts.jsonld');
    expect(result).toEqual([
      {
        id: "https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/tags/concepts/atm_food",
        name: "Etenswaren"
      }
    ]);
  });
});
