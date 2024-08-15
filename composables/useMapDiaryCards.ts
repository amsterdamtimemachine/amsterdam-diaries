const highlightContent = (content?: string, highlight?: string) => {
  if (!content) {
    return '';
  }
  if (!highlight) {
    return content;
  }
  return content.replace(highlight, `<span class="highlight">${highlight}</span>`);
};

const formatFirstName = (firstName: string) => {
  // TODO: This is a temporary solution, in the future find solution that works for all names
  if (firstName === 'Dien') {
    return 'Diens';
  } else if (firstName === 'Neeltje') {
    return 'Neeltjes';
  }
  return `${firstName}'${firstName.slice(-1) !== 's' ? 's' : ''}`;
};

export default (annotations: EntityContext[]): DiaryCard[] => {
  const diaryCards = [] as DiaryCard[];
  annotations.forEach((annotation: EntityContext) => {
    if (annotation.author) {
      diaryCards.push({
        headerTitle: annotation.diaryName,
        headerSubtitle: annotation.temporalCoverage,
        content: highlightContent(annotation.content, annotation.highlight),
        link: `/dagboeken/${annotation.author.slug}`,
        linkText: `Lees ${formatFirstName(annotation.author.firstName)} dagboek`,
      } as DiaryCard);
    }
  });

  return diaryCards;
};
