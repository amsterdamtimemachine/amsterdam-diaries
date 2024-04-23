const parseSelectors = (selectors: Array<TextPositionSelector | TextQuoteSelector>) => {
  return selectors.reduce(
    (
      output: Partial<{ value: string; start: number; end: number }>,
      selector: TextPositionSelector | TextQuoteSelector,
    ) => {
      switch (selector.type) {
        case 'TextQuoteSelector':
          output.value = selector.exact;
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
      source: target.source,
      ...parseSelectors(target.selector),
    };
  });
};
