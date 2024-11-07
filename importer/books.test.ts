import { it, describe, expect } from 'vitest';
import { importBooks } from './books';
import expectedResults from './expectedResults/books';
import expectedResultTest from './expectedResultTest';

const url = `https://raw.githubusercontent.com/amsterdamtimemachine/amsterdam-diaries-data/test/rdf/metadata.jsonld`;

describe('Books', async () => {
  it('Should validate correctly', async () => {
    const result = await (await fetch(url)).json();
    const books = result.filter((item: any) => item['@type'] === 'Book');
    const bookKeys = [
      '@context',
      '@id',
      '@type',
      'author',
      'about',
      'name',
      'isPartOf',
      'hasPart',
      'description',
      'temporalCoverage',
      'dateCreated',
      'identifier',
      'url',
      'image',
      'sameAs',
    ];

    books.forEach((book: any) => {
      expect(Object.keys(book).every(key => bookKeys.includes(key))).toBe(true);
      expect(Array.isArray(book.hasPart)).toBe(true);
      expect(book.hasPart.length).toBeGreaterThan(3000);
    });
  });

  describe('importBooks', async () => {
    const result = await importBooks(url);
    expectedResultTest(result, expectedResults);
  });
});
