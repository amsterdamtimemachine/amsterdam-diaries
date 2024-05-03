import jsonld from 'jsonld';
import type { JsonLdDocument } from 'jsonld';

const frames = {
  authors: AuthorsFrame,
  diariesOfAuthor: DiariesOfAuthorFrame,
  entriesOfDiary: EntriesOfDiaryFrame,
  getText: TextFrame,
  getEntityAnnotation: AnnotationFrame,
  getConceptAnnotation: AnnotationFrame,
  getAnnotation: AnnotationFrame,
  locationsPerAuthor: LocationsPerAuthorFrame,
};

export type FrameIds = keyof typeof frames;

export default async (type: FrameIds, uri: string) => {
  const response = (await $fetch(uri)) as JsonLdDocument;
  return await jsonld.frame(response, frames[type]);
};
