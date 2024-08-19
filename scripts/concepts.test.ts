import { it, describe, expect } from 'vitest';

// https://raw.githubusercontent.com/amsterdamtimemachine/amsterdam-diaries-data/dev/rdf/concepts.jsonld

const input = await fetch('http://localhost:3000/testdata/concepts.jsonld').then(res => res.text())

describe('concepts', async () => {
  it ('Can parse', async () => {
    console.warn('input', input);
    expect(true).toBe(false);
  });
});
