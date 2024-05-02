const parseSource = (source: string | TextualBody) => {
  if (typeof source === 'string') {
    return { source };
  }

  const content = `${source.prev?.value || ''} ${source.value} ${source.next?.value || ''}`.trim();

  return {
    source: source.id,
    content,
  };
};

const parseSelectors = (selectors: Array<TextPositionSelector | TextQuoteSelector>) => {
  return selectors.reduce(
    (
      output: Partial<{ highlight: string; start: number; end: number }>,
      selector: TextPositionSelector | TextQuoteSelector,
    ) => {
      switch (selector.type) {
        case 'TextQuoteSelector':
          output.highlight = selector.exact;
          break;
        case 'TextPositionSelector':
          output.start = selector.start;
          output.end = selector.end;
          break;
      }
      return output;
    },
    {},
  );
};

export default (input: Target | Target[]): SelectorTarget[] => {
  const targets = useForceArray(input);
  return targets.map((target: Target) => {
    return {
      ...parseSource(target.source),
      ...parseSelectors(target.selector),
    };
  });
};
