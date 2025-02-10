import { it, describe, expect } from 'vitest';
import { importAuthors } from './authors';
import expectedResultTest from './expectedResultTest';

const url = `${process.env.IMPORT_URL}/metadata.jsonld`;

describe('Authors', async () => {
  it('Should validate correctly', async () => {
    const result = await (await fetch(url)).json();
    const people = result.filter((item: any) => item['@type'] === 'Person');
    const personKeys = [
      '@context',
      '@id',
      '@type',
      'name',
      'birthDate',
      'birthPlace',
      'deathDate',
      'deathPlace',
      'image',
      'description',
    ];

    // Ensure we only check Persons
    people.forEach((person: any) => {
      expect(Object.keys(person).every(key => personKeys.includes(key))).toBe(true);
      if (person.birthPlace) {
        expect(Object.keys(person.birthPlace)).toEqual(['@id', '@type', 'name']);
      }
      if (person.deathPlace) {
        expect(Object.keys(person.deathPlace)).toEqual(['@id', '@type', 'name']);
      }
      if (person.image) {
        expect(Object.keys(person.image)).toEqual(['@id', 'type', 'contentUrl', 'thumbnailUrl']);
      }
    });
  });

  describe('importAuthors', async () => {
    const result = await importAuthors(url);
    expectedResultTest(result, {
      author: [
        'id',
        'name',
        'description',
        'slug',
        'birth_date',
        'birth_place_id',
        'death_date',
        'death_place_id',
        'image_id',
      ],
      image: ['id', 'content_url', 'thumbnail_url'],
      resource: ['id', 'type', 'name'],
    });
  });
});
