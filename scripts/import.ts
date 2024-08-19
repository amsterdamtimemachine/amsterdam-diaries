import { importConcepts, definitionConcepts } from "./concepts";
import Database from "./utils/database";

// concept url
const baseUrl = "https://raw.githubusercontent.com/amsterdamtimemachine/amsterdam-diaries-data/dev/rdf";
const conceptUrl = "concepts.jsonld"

// Setup the database
const db = Database.getInstance();
await db.create(definitionConcepts);


// Run the importers
const data = await importConcepts(`${baseUrl}/${conceptUrl}`);
db.insertMultiple('concepts', data);
