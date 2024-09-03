import { definitionAnnotations, importAnnotations } from './annotations';
import { importConcepts, definitionConcepts } from './concepts';
import { importResources, definitionResources } from './resources';
import { importAuthors, definitionAuthors } from './authors';
import { importBooks, definitionBooks } from './books';
import { definitionEntries, importEntries } from './entries';
import { definitionBlocks, importBlocks } from './blocks';
import Database from './utils/database';
import { definitionImages } from './images';
import { definitionLines, importLines } from './lines';

// concept url
const baseUrl = 'https://raw.githubusercontent.com/amsterdamtimemachine/amsterdam-diaries-data/dev/rdf';

// For test purposes
const db = Database.getInstance();
await db.clean();

// Setup the database
await db.create(definitionImages);
await db.create(definitionConcepts);
await db.create(definitionResources);
await db.create(definitionAnnotations);
await db.create(definitionAuthors);
await db.create(definitionBooks);
await db.create(definitionEntries);
await db.create(definitionBlocks);
await db.create(definitionLines);

// Run the importers
const concepts = await importConcepts(`${baseUrl}/concepts.jsonld`);
await db.insert('concept', concepts);

const resources = await importResources(`${baseUrl}/external_resources.jsonld`);
await db.insert('resource', resources);

const annotations = await importAnnotations(`${baseUrl}/entity_annotations.jsonld`, concepts);
await db.insert('annotation', annotations);

const authors = await importAuthors(`${baseUrl}/metadata.jsonld`);
await db.insert('image', authors.images);
await db.insert('resource', authors.resources);
await db.insert('author', authors.authors);

const books = await importBooks(`${baseUrl}/metadata.jsonld`);
await db.insert('book', books.books);
await db.insert('entry', books.entries);

const entries = await importEntries(`${baseUrl}/metadata.jsonld`);
await db.insert('entry', entries.entries);
await db.insert('block', entries.blocks);

const blocks = await importBlocks(`${baseUrl}/textual_annotations.jsonld`);
await db.insert('image', blocks.images);
await db.insert('block', blocks.blocks);
await db.insert('line', blocks.lines);

const lines = await importLines(`${baseUrl}/textual_annotations.jsonld`);
await db.insert('line', lines);
