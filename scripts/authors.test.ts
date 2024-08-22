import { it, describe, expect } from 'vitest';
import { importAuthors } from './authors';

const url = 'http://localhost:3000/testdata/authors.jsonld';

describe('Authors', async () => {
  it ('Should pass validation', async () => {
    const result = await fetch(url);
    const allowedKeys = ['@context', '@id', '@type', 'name', 'birthDate', 'birthPlace', 'deathDate', 'deathPlace', 'image', 'description'];
    (await result.json())
        // Ensure we only check Persons
      .filter((item: any) => item['@type'] === 'Person')
      .forEach((author: any) => {
        const topKeys = Object.keys(author);
        expect(topKeys.every(key => allowedKeys.includes(key))).toBe(true);
        if (author.birthPlace) {
          expect(Object.keys(author.birthPlace)).toEqual(['@id', '@type', 'name']);
        }
        if (author.deathPlace) {
          expect(Object.keys(author.deathPlace)).toEqual(['@id', '@type', 'name']);
        }
        if (author.image) {
          expect(Object.keys(author.image)).toEqual(['@id', 'type', 'contentUrl', 'thumbnailUrl']);
        }
    });

  });

  it('Should parse correctly', async () => {
    const result = await importAuthors(url);
    expect(result).toEqual({
      authors: [
        {
          id: 'http://www.wikidata.org/entity/Q125020291',
          name: 'Els Polak',
          birthDate: '1922-11-30',
          birthPlaceId: 'http://www.wikidata.org/entity/Q14492',
          deathDate: '1965-10-09',
          deathPlaceId: 'http://www.wikidata.org/entity/Q60',
          description: 'Els Polak (1922-1965), geboren in Nederlands-Indië, verhuist in 1940 na haar eindexamen van Hilversum naar Amsterdam. Ze volgt de opleiding tot Montessori-kleuterleidster en heeft een kamer op de Prinsengracht. Daar begint zij een dagboek, waarin ze schrijft over haar nieuwe, vrije leven in Amsterdam, over vriendschap, liefde, de oorlog en de situatie van de Joden. In 1942 gaat zij terug naar haar moeder en zusje in Hilversum. Haar dagboek bestaat uit 2 delen, geschreven in 1940-1941. Beide dagboeken zijn onderdeel van de collectie van Atria.',
          imageId: 'https://images.diaries.amsterdamtimemachine.nl/iiif/profile-overview/els-polak/profile/1.jpg/full/max/0/default.jpg',
        }
      ],
      images: [
        {
          id: 'https://images.diaries.amsterdamtimemachine.nl/iiif/profile-overview/els-polak/profile/1.jpg/full/max/0/default.jpg',
          contentUrl: 'https://images.diaries.amsterdamtimemachine.nl/iiif/profile-overview/els-polak/profile/1.jpg/full/max/0/default.jpg/full/max/0/default.jpg',
          thumbnailUrl: 'https://images.diaries.amsterdamtimemachine.nl/iiif/profile-overview/els-polak/profile/1.jpg/full/max/0/default.jpg/full/96,/0/default.jpg',
        }
      ],
      places: [
        {
          id: "http://www.wikidata.org/entity/Q14492",
          name: "Balikpapan",
        },
        {
          id: "http://www.wikidata.org/entity/Q60",
          name: "New York",
        }
      ]
    });
  });
});
