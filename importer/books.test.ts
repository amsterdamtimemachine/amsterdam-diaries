import { it, describe, expect } from 'vitest';
import { importBooks } from './books';
import expectedResultTest from './expectedResultTest';

const url = `${process.env.IMPORT_URL}/metadata.jsonld`;

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
      expect(book.hasPart.length).toBeGreaterThan(0);
    });
  });

  describe('importBooks', async () => {
    const result = await importBooks(url);
    expectedResultTest(result, {
      book: ['id', 'author_id', 'about_id', 'name', 'description', 'temporal_coverage', 'date_created'],
      entry: ['id', 'book_id', 'position'],
    });
  });
});
