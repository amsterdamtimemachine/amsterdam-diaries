import xml2js from 'xml2js';

const getTextEquiv = (input: any) => {
  return input['TextEquiv']?.[0]?.['Unicode'][0];
};

const parseCustom = (input: string): CustomData => {
  return (input.match(/\{(.*?)\}/g) || []).reduce((collection, entry) => {
    const keyValue = entry
      .slice(1, -1)
      .split(':')
      .map(s => s.replace(';', ''));
    if (keyValue[0] === 'index') {
      collection.index = parseInt(keyValue[1], 10);
    } else {
      collection[keyValue[0]] = keyValue[1];
    }
    return collection;
  }, {} as CustomData);
};

const parseLines = (lineData: any[]): any[] => {
  return (lineData || [])
    .map((line: any) => {
      // Fetch the text & skip if empty
      const text = getTextEquiv(line);
      if (text?.length) {
        const customData = parseCustom(line['$']['custom']);
        return {
          id: line['$']['id'],
          lineIdx: customData.index,
          text,
        };
      }
      return;
    })
    .filter(x => x);
};

const extractLines = (pageData: any, annotations: Annotation[]): Line[] => {
  // There are multiple regions, so iterate over them if they contain text
  return pageData['TextRegion'].reduce((collection: Line[], region: any) => {
    // Get Region custom data
    const customData = parseCustom(region['$']['custom']);

    // Parse the lines in this region and add them to the collection
    const textLines = parseLines(region['TextLine']);
    collection.push(
      ...textLines.map(({ lineIdx, id, text }: any) => {
        return {
          paragraphIdx: customData.index,
          lineIdx,
          text,
          annotations: annotations.filter(annotation => annotation.id === id),
        };
      }),
    );
    return collection;
  }, [] as Line[]);
};

const extractImage = (pageData: any): Image => {
  return {
    uri: pageData['$']['imageFilename'],
    width: pageData['$']['imageWidth'],
    height: pageData['$']['imageHeight'],
  };
};

const parsePage = async (pageNumber: number, annotations: Annotation[], data: any): Promise<DiaryPage> => {
  const parser = new xml2js.Parser();
  // The example we base this on, only has 1 page per xml file, so directly fetch this
  // from the parse result
  const pageData = (await parser.parseStringPromise(data))?.['PcGts']?.['Page']?.[0];

  return {
    pageNumber,
    image: extractImage(pageData),
    lines: extractLines(pageData, annotations),
  };
};

export { parsePage };
