import jsonld from 'jsonld';

type item = {
  '@type': string,
  id: string,
  name: string
}

const frame = {
  "@context": {
    "id": "@id",
    "name": "http://www.w3.org/2000/01/rdf-schema#label"
  },
  "type": "Concept",
  "id": {},
  "name": {},
};

const importConcepts = async (importUrl: string) => {
  const result = await fetch(importUrl);
  const json = await result.json();
  const framed = await jsonld.frame(json, frame, { explicit: true, omitGraph: false });
  return ((framed['@graph'] ?? []) as item[]).map((item: item) => {
    return {
      id: item.id,
      name: item.name
    }
  });
};

export {
  importConcepts
}
