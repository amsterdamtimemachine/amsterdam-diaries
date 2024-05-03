const highlightContent = (content?: string, highlight?: string) => {
  if (!content) {
    return '';
  }
  if (!highlight) {
    return content;
  }
  return content.replace(highlight, `<span class="highlight">${highlight}</span>`);
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
        linkText: `Lees ${annotation.author.firstName}'${annotation.author.firstName.slice(-1) !== 's' ? 's' : ''} dagboek`,
      } as DiaryCard);
    }
  });

  return diaryCards;
};
