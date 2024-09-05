export default {
  books: [
    {
      id: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/diaries/0',
      authorId: 'http://www.wikidata.org/entity/Q65965451',
      aboutId: 'http://www.wikidata.org/entity/Q65965451',
      name: 'Dagboek Toby Vos, deel 1',
      description:
        'Dagboek van Toby Vos, geschreven te Amsterdam, 26-27 jaar, betreffende de oorlog en haar buren, 1944-1945. Tijdens de oorlog was Toby als koerierster actief in het verzet (Paroolgroep). Het dagboek is geillustreerd met tekeningen.',
      temporalCoverage: '1944/1945',
      dateCreated: '1944-06-01',
    },
  ],
  entries: [
    {
      id: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/entries/test1',
      bookId: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/diaries/0',
      position: 1,
    },
    {
      id: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/entries/test2',
      bookId: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/diaries/0',
      position: 2,
    },
    {
      id: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/entries/test3',
      bookId: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/diaries/0',
      position: 3,
    },
    {
      id: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/entries/test4',
      bookId: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/diaries/0',
      position: 4,
    },
    {
      id: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/entries/test5',
      bookId: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/diaries/0',
      position: 5,
    },
  ],
} as const;
