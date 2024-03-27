import { loadDiaryFile } from '~/helpers/load';
import { parseAnnotation } from '~/helpers/parsers/annotations';
import { parsePage } from '~/helpers/parsers/diary';

// TODO: Should be a param from the call
const WRITER = 'TobyVos';

const loadAnnotations = (): Annotation[] => {
  console.warn(`Loading annotations for diary: ${WRITER}`);
  const json = JSON.parse(loadDiaryFile(WRITER, 'annotations.jsonld'));
  return json.map(parseAnnotation) || [];
};

const loadDiaryPage = async (pageNumber: number, annotations: Annotation[]) => {
  console.warn(`Loading page number: ${pageNumber}`);
  const xml = loadDiaryFile(WRITER, `urn-gvn-EVDO01-IIAV002_IAV001000030-large_0${pageNumber}.xml`);
  return await parsePage(pageNumber, annotations, xml);
};

export default defineEventHandler(async event => {
  try {
    const pageNumber = getRouterParam(event, 'pageNumber');
    const annotations = loadAnnotations();
    return await loadDiaryPage(parseInt(pageNumber!, 10), annotations);
  } catch (e) {
    console.warn(e);
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid Diary page requested',
    });
  }
});
