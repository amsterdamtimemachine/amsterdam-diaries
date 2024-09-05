import { it, describe, expect } from 'vitest';
import { importAnnotations } from './annotations';
import expectedResults from './expectedResults/annotations';
import { mockConcepts } from './utils/mocks';

const url = `https://raw.githubusercontent.com/amsterdamtimemachine/amsterdam-diaries-data/test/rdf/entity_annotations.jsonld`;

describe('Annotations', async () => {
  it('Should validate correctly', async () => {
    const result = await (await fetch(url)).json();

    // Check the unfiltered results (to illustrate that importAnnotations is filtering)
    expect(result.length).toBe(64);

    result.forEach((annotation: any) => {
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

  describe('importAnnotations', async () => {
    const result = await importAnnotations(url, mockConcepts);

    it(`Should return an array of ${expectedResults.length} annotations`, async () => {
      expect(result.length).toBe(expectedResults.length);
    });

    result.forEach((annotation, index) => {
      it(`Should parse annotation #${index + 1} correctly`, async () => {
        expect(annotation).toEqual(expectedResults[index]);
      });
    });
  });
});
