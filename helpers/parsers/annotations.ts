/**
 * TODO: Improve this very basic Annotation parser
 * TODO: Improve typescript usage
 * @see: https://totaldesign.atlassian.net/jira/software/projects/ATM/boards/107/backlog?selectedIssue=ATM-65
 */
const parseAnnotation = (data: any): Annotation => {
  const annotation = {
    id: data.target.source as string,
  };

  // Process target
  data.target.selector.reduce((annotation: Annotation, entry: any) => {
    switch (entry.type) {
      case 'TextQuoteSelector':
        annotation.value = entry.exact;
        break;
      case 'TextPositionSelector':
        annotation.start = entry.start;
        annotation.end = entry.end;
        break;
    }
    return annotation;
  }, annotation);

  // Process Body
  data.body.reduce((annotation: Annotation, entry: any) => {
    switch (entry.purpose) {
      case 'classifying':
        annotation.type = entry.value;
        break;
      case 'identifying':
        annotation.ref = entry.value || entry.source;
        break;
    }
    return annotation;
  }, annotation);

  return annotation;
};

export { parseAnnotation };
