export default (url: string) => {
  if (url.includes('wikidata')) {
    return 'Wikidata';
  } else if (url.includes('adamlink')) {
    return 'Adamlink';
  } else if (url.includes('archief.amsterdam')) {
    return 'Stadsarchief';
  }
  return 'Externe link';
};
