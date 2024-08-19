const importConcepts = async () => {
  // Fetch the data from
  const data = await fetch('https://raw.githubusercontent.com/amsterdamtimemachine/amsterdam-diaries-data/dev/rdf/concepts.jsonld').then(res => res.json());
  console.warn(data);

  return {};
};

export {
  importConcepts
}
