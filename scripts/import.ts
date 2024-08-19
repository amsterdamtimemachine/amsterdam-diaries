import { importConcepts, definitionConcepts } from './concepts';
import { importResources, definitionPeople, definitionOrganizations, definitionPlaces } from './resources';
import Database from './utils/database';

// concept url
const baseUrl = 'https://raw.githubusercontent.com/amsterdamtimemachine/amsterdam-diaries-data/dev/rdf';
const conceptUrl = 'concepts.jsonld';
const resourcesUrl = 'external_resources.jsonld';

// Setup the database
const db = Database.getInstance();
await db.create(definitionConcepts);
await db.create(definitionPeople);
await db.create(definitionOrganizations);
await db.create(definitionPlaces);

// Run the importers
const concepts = await importConcepts(`${baseUrl}/${conceptUrl}`);
await db.insertMultiple('concepts', concepts);

const resources = await importResources(`${baseUrl}/${resourcesUrl}`);
await db.insertMultiple('people', resources.people);
await db.insertMultiple('organizations', resources.organizations);
await db.insertMultiple('places', resources.places);
