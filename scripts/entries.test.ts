import { it, describe, expect } from 'vitest';
import { importEntries } from './entries';

describe('Entries', async () => {
  it ('should pass validation', async () => {
    const url = 'http://localhost:3000/testdata/metadata.jsonld';
    const result = await fetch(url);
    const metadata = await result.json();

    const y = metadata.filter(data => data.body.every(body => body['@type'] === 'Manuscript'));
    console.warn(y);


    // metadata.forEach((data: any) => {
    //   console.warn(data);

    // });
  });

  it.skip ('should parse correctly', async () => {
    const result = await importEntries('http://localhost:3000/testdata/metadata.jsonld');
    expect(result).toEqual([
      {
        id: "https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/tags/concepts/atm_food",
        name: "Etenswaren"
      }
    ]);
  });
});
