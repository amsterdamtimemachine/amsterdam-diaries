import { it, describe, expect } from 'vitest';
import { importBooks } from './books';

describe('books', async () => {
  it('Can parse', async () => {
    const result = await importBooks('http://localhost:3000/testdata/books.jsonld');
    expect(result).toEqual({
      books: [
        {
          id: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/diaries/4',
          authorId: 'http://www.wikidata.org/entity/Q65965451',
          aboutId: 'http://www.wikidata.org/entity/Q65965451',
          name: 'Dagboek Toby Vos, deel 1',
          description:
            'Dagboek van Toby Vos, geschreven te Amsterdam, 26-27 jaar, betreffende de oorlog en haar buren, 1944-1945. Tijdens de oorlog was Toby als koerierster actief in het verzet (Paroolgroep). Het dagboek is geillustreerd met tekeningen.',
          temporalCoverage: '1944/1945',
          dateCreated: '1944-06',
        },
      ],
      entries: [
        {
          id: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/entries/49',
          bookId: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/diaries/4',
          position: 1,
        },
        {
          id: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/entries/50',
          bookId: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/diaries/4',
          position: 2,
        },
        {
          id: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/entries/51',
          bookId: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/diaries/4',
          position: 3,
        },
        {
          id: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/entries/52',
          bookId: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/diaries/4',
          position: 4,
        },
        {
          id: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/entries/53',
          bookId: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/diaries/4',
          position: 5,
        },
        {
          id: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/entries/54',
          bookId: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/diaries/4',
          position: 6,
        },
        {
          id: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/entries/55',
          bookId: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/diaries/4',
          position: 7,
        },
        {
          id: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/entries/56',
          bookId: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/diaries/4',
          position: 8,
        },
        {
          id: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/entries/57',
          bookId: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/diaries/4',
          position: 9,
        },
        {
          id: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/entries/58',
          bookId: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/diaries/4',
          position: 10,
        },
        {
          id: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/entries/59',
          bookId: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/diaries/4',
          position: 11,
        },
        {
          id: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/entries/60',
          bookId: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/diaries/4',
          position: 12,
        },
        {
          id: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/entries/61',
          bookId: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/diaries/4',
          position: 13,
        },
        {
          id: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/entries/62',
          bookId: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/diaries/4',
          position: 14,
        },
        {
          id: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/entries/63',
          bookId: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/diaries/4',
          position: 15,
        },
        {
          id: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/entries/64',
          bookId: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/diaries/4',
          position: 16,
        },
        {
          id: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/entries/65',
          bookId: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/diaries/4',
          position: 17,
        },
      ],
    });
  });
});
