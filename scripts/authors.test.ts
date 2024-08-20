import { it, describe, expect } from 'vitest';
import { importAuthors } from './authors';

describe('authors', async () => {
  it('Can parse', async () => {
    const result = await importAuthors('http://localhost:3000/testdata/authors.jsonld');
    expect(result).toEqual([
      {
        id: 'http://www.wikidata.org/entity/Q125020291',
        name: 'Els Polak',
        birthDate: '1922-11-30',
        birthPlaceId: 'http://www.wikidata.org/entity/Q14492',
        deathDate: '1965-10-09',
        deathPlaceId: 'http://www.wikidata.org/entity/Q60',
        description:
          'Els Polak (1922-1965), geboren in Nederlands-Indië, verhuist in 1940 na haar eindexamen van Hilversum naar Amsterdam. Ze volgt de opleiding tot Montessori-kleuterleidster en heeft een kamer op de Prinsengracht. Daar begint zij een dagboek, waarin ze schrijft over haar nieuwe, vrije leven in Amsterdam, over vriendschap, liefde, de oorlog en de situatie van de Joden. In 1942 gaat zij terug naar haar moeder en zusje in Hilversum. Haar dagboek bestaat uit 2 delen, geschreven in 1940-1941. Beide dagboeken zijn onderdeel van de collectie van Atria.',
        imageUrl:
          'https://images.diaries.amsterdamtimemachine.nl/iiif/profile-overview/els-polak/profile/1.jpg/full/max/0/default.jpg',
        contentUrl:
          'https://images.diaries.amsterdamtimemachine.nl/iiif/profile-overview/els-polak/profile/1.jpg/full/max/0/default.jpg/full/max/0/default.jpg',
        thumbnailUrl:
          'https://images.diaries.amsterdamtimemachine.nl/iiif/profile-overview/els-polak/profile/1.jpg/full/max/0/default.jpg/full/96,/0/default.jpg',
      },
    ]);
  });
});
