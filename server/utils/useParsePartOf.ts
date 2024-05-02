const useParseAuthorSlug = (about: About) => {
  return about.name.toLowerCase().replaceAll(' ', '-').replaceAll(/[()]/g, '');
};

const useParseAbout = (about: About): ParsedAbout => {
  return {
    name: about.name,
    firstName: about.name.split(' ')[0],
    slug: useParseAuthorSlug(about),
  };
};

const useIsParsePartOf = (input: IsPartOf): ParsedIsPartOf => {
  const isPartOf = input.isPartOf ? useIsParsePartOf(input.isPartOf) : undefined;
  const about = input.about ? useParseAbout(input.about) : undefined;
  const book = input.type === 'Book' ? { diaryName: input.name, temporalCoverage: input.temporalCoverage } : undefined;

  return {
    author: about,
    ...isPartOf,
    ...book,
  };
};

export default (input?: IsPartOf) => {
  if (!input) {
    return;
  }
  return useIsParsePartOf(input);
};
