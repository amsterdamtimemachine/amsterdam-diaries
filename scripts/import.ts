import { definitionAnnotations, importAnnotations } from './annotations';
import { importConcepts, definitionConcepts } from './concepts';
import { importResources, definitionPeople, definitionOrganizations, definitionPlaces } from './resources';
import { importAuthors, definitionAuthors } from './authors';
import { importBooks, definitionBooks } from './books';
import { definitionEntries, importEntries } from './entries';
import { definitionParagraphs } from './paragraph';
import Database from './utils/database';
import { definitionImages } from './images';
import { definitionLines } from './lines';

// concept url
const baseUrl = 'https://raw.githubusercontent.com/amsterdamtimemachine/amsterdam-diaries-data/dev/rdf';

// For test purposes
const db = Database.getInstance();
await db.clean();

// Setup the database
await db.create(definitionImages);
await db.create(definitionConcepts);
await db.create(definitionPeople);
await db.create(definitionOrganizations);
await db.create(definitionPlaces);
await db.create(definitionAnnotations);
await db.create(definitionAuthors);
await db.create(definitionBooks);
await db.create(definitionEntries);
await db.create(definitionParagraphs);
await db.create(definitionLines);

// Run the importers
const concepts = await importConcepts(`${baseUrl}/concepts.jsonld`);
await db.insert('concept', concepts);

const resources = await importResources(`${baseUrl}/external_resources.jsonld`);
await db.insert('person', resources.people);
await db.insert('organization', resources.organizations);
await db.insert('place', resources.places);

const annotations = await importAnnotations(`${baseUrl}/entity_annotations.jsonld`);
await db.insert('annotation', annotations);

const authors = await importAuthors(`${baseUrl}/metadata.jsonld`);
await db.insert('image', authors.images);
await db.insert('place', authors.places);
await db.insert('author', authors.authors);

const booksAndEntries = await importBooks(`${baseUrl}/metadata.jsonld`);
await db.insert('book', booksAndEntries.books);
await db.insert('entry', booksAndEntries.entries);

const entriesAndParagraphs = await importEntries(`${baseUrl}/metadata.jsonld`);
await db.insert('entry', entriesAndParagraphs.entries);
await db.insert('paragraph', entriesAndParagraphs.paragraphs);

// Test data for the snippets setup
// Leaving this in for now, might be useful for testing snippets UI
// await db.insert('paragraph', [{
//   id: '1',
//   parentId: booksAndEntries.entries[0].id,
//   position: 1
// }]);

// await db.insert('line', [
//   {
//     id: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/regions/0001_urn-gvn-EVDO01-IIAV002_IAV001000041-large_01/r-r_tl_2-body',
//     parentId: '1',
//     position: 1,
//     value: 'Els Polak was een schrijfster'
//   },
//   {
//     id: '2',
//     parentId: '1',
//     position: 2,
//     value: 'Deze tekst komt na de eerste regel'
//   },
//   {
//     id: '3',
//     parentId: '1',
//     position: 3,
//     value: 'Deze regel zou je nooit moeten zien'
//   },
//   {
//     id: '4',
//     parentId: '1',
//     position: 4,
//     value: 'Deze regel moet ervoor'
//   },
//   {
//     id: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/regions/0001_urn-gvn-EVDO01-IIAV002_IAV001000040-large_01/r_9-r_9_tl_3-body',
//     parentId: '1',
//     position: 5,
//     value: 'Els Polak was een schrijfster'
//   },
//   {
//     id: '5',
//     parentId: '1',
//     position: 6,
//     value: 'Deze regel erna'
//   }
// ]);
