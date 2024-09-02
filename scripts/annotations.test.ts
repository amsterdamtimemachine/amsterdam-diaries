import { it, describe, expect } from 'vitest';
import { importAnnotations } from './annotations';

describe('Annotations', async () => {
  let annotations: any;

  it('should pass validation', async () => {
    const url = 'http://localhost:3000/testdata/entity_annotations.jsonld';
    const result = await fetch(url);
    annotations = await result.json();

    annotations.forEach((annotation: any) => {
      // Validate the top level structure
      expect(Object.keys(annotation)).toEqual(['@context', 'id', 'type', 'body', 'target']);

      // Validate the body structure
      expect(Array.isArray(annotation.body)).toBe(true);

      // Validate the classification and identifying structure
      annotation.body.forEach((body: any) => {
        switch (body.type) {
          case 'SpecificResource':
            expect(Object.keys(body)).toEqual(['type', 'source', 'purpose']);

            switch (body.purpose) {
              case 'classifying':
                expect(Object.keys(body.source)).toEqual(['id', 'type', 'label']);
                break;
              case 'identifying':
                expect(Object.keys(body.source)).toEqual(['id', 'type']);
                break;
              default:
                // If the purpose is not recognized, fail the test
                expect(false).toBe(true);
            }
            break;
          case 'TextualBody':
            expect(Object.keys(body)).toEqual(['type', 'value', 'purpose']);

            switch (body.purpose) {
              case 'identifying':
                expect(Object.keys(body.value)).toEqual(['@type', '@value']);
                break;
              default:
                // If the purpose is not recognized, fail the test
                expect(false).toBe(true);
            }
            break;
          default:
            // If the type is not recognized, fail the test
            expect(false).toBe(true);
        }
      });

      // Validate the target structure
      expect(Array.isArray(annotation.target)).toBe(true);

      // Validate the selector structure
      annotation.target.forEach((target: any) => {
        expect(Object.keys(target)).toEqual(['type', 'source', 'selector']);
        expect(Array.isArray(target.selector)).toBe(true);
        target.selector.forEach((selector: any) => {
          switch (selector.type) {
            case 'TextQuoteSelector':
              expect(Object.keys(selector)).toEqual(['type', 'exact']);
              break;
            case 'TextPositionSelector':
              expect(Object.keys(selector)).toEqual(['type', 'start', 'end']);
              break;
            default:
              // If the type is not recognized, fail the test
              expect(false).toBe(true);
          }
        });
      });
    });
  });

  it('should parse correctly', async () => {
    const mockConcepts = [
      {
        name: 'Etenswaren',
      },
    ];
    const result = await importAnnotations('http://localhost:3000/testdata/entity_annotations.jsonld', mockConcepts);
    expect(result.length).toBe(4);
    expect(result).toStrictEqual([
      {
        id: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/4fd0f282-8b33-4fc1-a310-5449f152b15b0',
        type: 'Organization',
        identifyingId: 'http://www.wikidata.org/entity/Q160552',
        classifyingId: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/tags/entities/organization',
        sourceId:
          'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/regions/0111_berdi_4245_pdf_p111/r_3059-tr_1_tl_37',
        exactText: 'groene',
        startPosition: 77,
        endPosition: 83,
        correction: null,
      },
      {
        id: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/4fd0f282-8b33-4fc1-a310-5449f152b15b1',
        type: 'Organization',
        identifyingId: 'http://www.wikidata.org/entity/Q160552',
        classifyingId: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/tags/entities/organization',
        sourceId:
          'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/regions/0111_berdi_4245_pdf_p111/r_3059-tr_1_tl_38',
        exactText: 'politie',
        startPosition: 0,
        endPosition: 7,
        correction: null,
      },
      {
        id: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/ec5c5a91-f324-481a-9d2b-aee173c25d1e0',
        type: 'Date',
        identifyingId: null,
        classifyingId: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/tags/entities/date',
        sourceId:
          'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/regions/0002_urn-gvn-EVDO01-IIAV002_IAV001000041-large_02/r_525-r_525_tl_8',
        exactText: 'vrijdag j. l.',
        startPosition: 15,
        endPosition: 28,
        correction: '1941-02-21',
      },
      {
        id: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/a14ee93d-cebc-4790-9adc-7d321318ce700',
        type: 'Etenswaren',
        identifyingId: null,
        classifyingId: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/tags/concepts/atm_food',
        sourceId:
          'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/regions/0002_urn-gvn-EVDO01-IIAV002_IAV001000041-large_02/r_525-r_525_tl_14',
        exactText: 'lekkers',
        startPosition: 0,
        endPosition: 7,
        correction: null,
      },
    ]);
  });
});
