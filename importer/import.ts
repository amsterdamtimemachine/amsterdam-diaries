import { definitionAnnotations, importAnnotations } from './annotations';
import { definitionBlocks, importBlocks } from './blocks';
import { definitionEntries, importEntries } from './entries';
import { definitionImages } from './images';
import { definitionLines, importLines } from './lines';
import { importAuthors, definitionAuthors } from './authors';
import { importBooks, definitionBooks } from './books';
import { importConcepts, definitionConcepts } from './concepts';
import { importResources, definitionResources } from './resources';
import { definitionInfo, importInfo } from './info';
import Progress from 'cli-progress';
import Database from '../server/utils/database';

// concept url
const baseUrl = 'https://raw.githubusercontent.com/amsterdamtimemachine/amsterdam-diaries-data/dev/rdf';

// For test purposes
const db = Database.getInstance();

// Data setup
const structure = [
  {
    name: 'image',
    definition: definitionImages,
  },
  {
    name: 'info',
    uri: `${baseUrl}/info.json`,
    definition: definitionInfo,
    importFn: importInfo,
  },
  {
    name: 'concept',
    uri: `${baseUrl}/concepts.jsonld`,
    definition: definitionConcepts,
    importFn: importConcepts,
  },
  {
    name: 'resource',
    uri: `${baseUrl}/external_resources.jsonld`,
    definition: definitionResources,
    importFn: importResources,
  },
  {
    name: 'annotation',
    uri: `${baseUrl}/entity_annotations.jsonld`,
    definition: definitionAnnotations,
    importFn: importAnnotations,
  },
  {
    name: 'author',
    uri: `${baseUrl}/metadata.jsonld`,
    definition: definitionAuthors,
    importFn: importAuthors,
  },
  {
    name: 'book',
    uri: `${baseUrl}/metadata.jsonld`,
    definition: definitionBooks,
    importFn: importBooks,
  },
  {
    name: 'entry',
    uri: `${baseUrl}/metadata.jsonld`,
    definition: definitionEntries,
    importFn: importEntries,
  },
  {
    name: 'block',
    uri: `${baseUrl}/textual_annotations.jsonld`,
    definition: definitionBlocks,
    importFn: importBlocks,
  },
  {
    name: 'line',
    uri: `${baseUrl}/textual_annotations.jsonld`,
    definition: definitionLines,
    importFn: importLines,
  },
];

const steps = [
  {
    type: 'DELETE',
    label: 'Dropping tables',
  },
  {
    type: 'CREATE',
    label: 'Creating tables',
  },
  {
    type: 'IMPORT',
    label: 'Importing data',
  },
];

for (const idx in steps) {
  const step = steps[idx];
  const progress = new Progress.SingleBar(
    {
      format: `${step.label} | {bar} | {percentage}% | {value}/{total}`,
    },
    Progress.Presets.shades_classic,
  );
  progress.start(structure.length, 0);
  switch (step.type) {
    case 'DELETE':
      for (let idx = structure.length; idx > 0; idx--) {
        const tableName = structure[idx - 1].name;
        await db.delete(tableName);
        progress.increment(1);
      }
      break;
    case 'CREATE':
      for (let idx = 0; idx < structure.length; idx++) {
        const definition = structure[idx].definition;
        await db.create(definition);
        progress.increment(1);
      }
      break;
    case 'IMPORT':
      for (let idx = 0; idx < structure.length; idx++) {
        const importFn = structure[idx].importFn;
        const uri = structure[idx].uri;
        if (importFn && uri) {
          const data = await importFn(uri);
          for (const table in data) {
            await db.insert(table, data[table as keyof typeof data]);
          }
        }
        progress.increment(1);
      }
      break;
  }
  progress.stop();
}
db.close();
