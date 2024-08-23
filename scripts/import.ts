import { definitionAnnotations, importAnnotations } from './annotations';
import { importConcepts, definitionConcepts } from './concepts';
import { importResources, definitionPeople, definitionOrganizations, definitionPlaces } from './resources';
import { importAuthors, definitionAuthors } from './authors';
import { importBooks, definitionBooks } from './books';
import { definitionEntries, importEntries } from './entries';
import { definitionParagraphs, importParagraphs } from './paragraphs';
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

const paragraphsAndLines = await importParagraphs(`${baseUrl}/textual_annotations.jsonld`);
await db.insert('image', paragraphsAndLines.images);
await db.insert('paragraph', paragraphsAndLines.paragraphs);
await db.insert('line', paragraphsAndLines.lines);
