// Main importer file
// Include files and function calls in here

import { importConcepts } from "./concepts";


// concept url
const baseUrl = "https://raw.githubusercontent.com/amsterdamtimemachine/amsterdam-diaries-data/dev/rdf";
const conceptUrl = "concepts.jsonld"

// Run the importers
importConcepts(`${baseUrl}/${conceptUrl}`);
