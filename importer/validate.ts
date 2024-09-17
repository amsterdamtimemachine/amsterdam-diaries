import Database from '../server/utils/database';
import { writeFile } from 'fs/promises';
// For test purposes
const db = Database.getInstance();

// Global error array
const errors = [] as string[];

// Create the log file
const writeToFile = async () => {
  try {
    await writeFile('validate.log', errors.join('\n'));
  } catch (error) {
    console.error(error);
  }
};

const validateAnnotations = async () => {
  // Find any invalid formatted Date annotations
  const invalidDateAnnotations = await db.query(`
    SELECT *
    FROM annotation
    WHERE type = 'Date'
    AND correction REGEXP '^(?!^[0-9]{4}-[0-9]{2}-[0-9]{2}$).*$'`);

  if (invalidDateAnnotations.length) {
    errors.push('Invalid Date Annotations (Date format) - file: entity_annotations.jsonld');
    invalidDateAnnotations.forEach((row: any) => {
      errors.push(`Annotation ID: ${row.id} - exacte text: ${row.exacttext} - correction: ${row.correction}`);
    });
  }

  // Find any non linking annotations using these conditions:
  // - Identifying ID is NULL
  // - Type is not 'Date'
  // - Correction is NULL
  // - Type is not in the concept table
  const nonLinkingAnnotations = await db.query(`
    SELECT *
    FROM annotation
    WHERE identifying_id IS NULL
    AND type != 'Date'
    AND correction IS NULL
    AND type NOT IN (SELECT name FROM concept)`);

  if (nonLinkingAnnotations.length) {
    errors.push('Non linking Annotations - file: entity_annotations.jsonld');
    nonLinkingAnnotations.forEach((row: any) => {
      errors.push(`Annotation ID: ${row.id} - type: ${row.type} - exacte text: ${row.exacttext}`);
    });
  }
};

const validateResources = async () => {
  // Find any resouce without a name or slug
  const invalidResources = await db.query(`
    SELECT *
    FROM resource
    WHERE name IS NULL or slug IS NULL`);

  if (invalidResources.length) {
    errors.push('Invalid Resources - file: external_resources.jsonld');
    invalidResources.forEach((row: any) => {
      errors.push(`Resource ID: ${row.id}`);
    });
  }
};

// Validate the data
await validateAnnotations();
await validateResources();
await writeToFile();
db.close();
