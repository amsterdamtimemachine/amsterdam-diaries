/**
 * Example Annotation
 *
 * {
 *  "id": "https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/b013b1cc-f2b4-48f9-923b-9d64ebccc3de",
 *   "type": "Annotation",
 *   "body": [
 *     {
 *       "id": "https://lod.uba.uva.nl/.well-known/genid/8d373f020fea25e9ebf8d7aa3342018f",
 *       "purpose": "classifying",
 *       "source": {
 *         "id": "https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/tags/entities/place",
 *         "type": "Concept",
 *         "label": "Place"
 *       }
 *     },
 *     {
 *       "id": "https://lod.uba.uva.nl/.well-known/genid/d9875d637468a9605c6dba0e6fff2e3f",
 *       "purpose": "identifying",
 *       "source": {
 *         "id": "http://www.wikidata.org/entity/Q701",
 *         "type": "Place",
 *         "description": "provincie van Nederland",
 *         "geo": {
 *           "id": "https://lod.uba.uva.nl/.well-known/genid/f545aa3299af9859b00a2acf873e9099",
 *           "latitude": "5.2666667E1",
 *           "longitude": "4.833333E0"
 *         },
 *         "name": "Noord-Holland"
 *       }
 *     }
 *   ],
 *   "target": {
 *     "id": "https://lod.uba.uva.nl/.well-known/genid/660e68e791db067b7d7dd94ed05624cf",
 *     "selector": [
 *       {
 *         "id": "https://lod.uba.uva.nl/.well-known/genid/df9ba2e61819ef246a25af74e415790f",
 *         "type": "TextQuoteSelector",
 *         "exact": "N. Holland"
 *       },
 *       {
 *         "id": "https://lod.uba.uva.nl/.well-known/genid/f74df5ad649fc3ff3e3f2ddd3237cb85",
 *         "type": "TextPositionSelector",
 *         "end": "35",
 *         "start": "25"
 *       }
 *     ],
 *     "source": "https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/regions/0003_urn-gvn-EVDO01-IIAV002_IAV001000041-large_03/r_18-r_18_tl_23-body"
 *   }
 * },
 *
 * Should be transformed into:
 * {
 *  type: "Place",
 *  value: "http://www.wikidata.org/entity/Q701",
 *  name: "Noord-Holland"
 *  description: "provincie van Nederland",
 *  latitude: "5.2666667E1",
 *  longitude: "4.833333E0",
 *  value: "N. Holland",
 *  start: 35,
 *  end: 25
 * }
 */
export default async (input: Annotation) => {
  try {
    // TODO: Revisit this setup, since body and target are being merged
    // We have to defined types with optional or partial
    // Making it harder to rely on the input and a nightmare for typing
    const parsedBody = useParseBody(input.body);
    const parseTargets = useParseTarget(input.target);
    const parsedPartOf = useParsePartOf(input.isPartOf);
    return parseTargets.map((target: SelectorTarget): AnnotationRef => {
      return {
        guid: useSimplifyId(input.id),
        ...target,
        ...parsedBody,
        ...parsedPartOf,
      };
    });
  } catch (e) {
    console.warn(e);
  }
};
