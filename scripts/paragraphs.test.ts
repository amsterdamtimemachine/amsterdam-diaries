import { it, describe, expect } from 'vitest';
import { importParagraphs } from './paragraphs';

const url = 'http://localhost:3000/testdata/paragraphs.jsonld';

describe('Paragraphs', async () => {
  it('should pass validation', async () => {
    const result = await (await fetch(url)).json();
    const allowedKeys = ['@context', 'id', 'type', 'textGranularity', 'items', 'body', 'target'];
    const blocks = result.filter((data: any) => {
      return data.textGranularity === 'block' && data.body?.[0]?.source?.label === 'Paragraph';
    });

    // Top level check
    blocks.forEach((block: any) => {
      const topKeys = Object.keys(block);
      expect(topKeys.every(key => allowedKeys.includes(key))).toBe(true);

      // Check items
      expect(Array.isArray(block.items)).toBe(true);
      expect(block.items.length).toBeGreaterThan(0);

      // Check body
      expect(Array.isArray(block.body)).toBe(true);
      expect(block.body.length).toBe(1);

      // Check target
      expect(Object.keys(block.target)).toEqual(['id', 'type', 'source', 'selector']);
      expect(Object.keys(block.target.source)).toEqual(['@id', 'type', 'name', 'contentUrl', 'thumbnailUrl']);
      block.target.selector.forEach((selector: any) => {
        expect(Object.keys(selector)).toEqual(['type', 'value', 'conformsTo']);
      });
    });
  });

  it('should parse correctly', async () => {
    const result = await importParagraphs(url);
    expect(result).toEqual({
      images: [
        {
          contentUrl:
            'https://images.diaries.amsterdamtimemachine.nl/iiif/urn-gvn-EVDO01-IIAV002_IAV001000030-large_03.jpg/full/max/0/default.jpg',
          id: 'https://images.diaries.amsterdamtimemachine.nl/iiif/urn-gvn-EVDO01-IIAV002_IAV001000030-large_03.jpg',
          thumbnailUrl:
            'https://images.diaries.amsterdamtimemachine.nl/iiif/urn-gvn-EVDO01-IIAV002_IAV001000030-large_03.jpg/full/,250/0/default.jpg',
        },
      ],
      paragraphs: [
        {
          id: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/regions/0003_urn-gvn-EVDO01-IIAV002_IAV001000030-large_03/r_1077',
          dimensions: 'xywh=785,777,685,410',
          imageId:
            'https://images.diaries.amsterdamtimemachine.nl/iiif/urn-gvn-EVDO01-IIAV002_IAV001000030-large_03.jpg',
        },
      ],
      lines: [
        {
          id: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/regions/0003_urn-gvn-EVDO01-IIAV002_IAV001000030-large_03/r_1077-tr_1_tl_9',
          paragraphId:
            'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/regions/0003_urn-gvn-EVDO01-IIAV002_IAV001000030-large_03/r_1077',
          position: 1,
        },
        {
          id: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/regions/0003_urn-gvn-EVDO01-IIAV002_IAV001000030-large_03/r_1077-tr_1_tl_10',
          paragraphId:
            'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/regions/0003_urn-gvn-EVDO01-IIAV002_IAV001000030-large_03/r_1077',
          position: 2,
        },
        {
          id: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/regions/0003_urn-gvn-EVDO01-IIAV002_IAV001000030-large_03/r_1077-tr_1_tl_11',
          paragraphId:
            'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/regions/0003_urn-gvn-EVDO01-IIAV002_IAV001000030-large_03/r_1077',
          position: 3,
        },
        {
          id: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/regions/0003_urn-gvn-EVDO01-IIAV002_IAV001000030-large_03/r_1077-tr_1_tl_12',
          paragraphId:
            'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/regions/0003_urn-gvn-EVDO01-IIAV002_IAV001000030-large_03/r_1077',
          position: 4,
        },
        {
          id: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/regions/0003_urn-gvn-EVDO01-IIAV002_IAV001000030-large_03/r_1077-tr_1_tl_13',
          paragraphId:
            'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/regions/0003_urn-gvn-EVDO01-IIAV002_IAV001000030-large_03/r_1077',
          position: 5,
        },
        {
          id: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/regions/0003_urn-gvn-EVDO01-IIAV002_IAV001000030-large_03/r_1077-tr_1_tl_14',
          paragraphId:
            'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/regions/0003_urn-gvn-EVDO01-IIAV002_IAV001000030-large_03/r_1077',
          position: 6,
        },
        {
          id: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/regions/0003_urn-gvn-EVDO01-IIAV002_IAV001000030-large_03/r_1077-tr_1_tl_15',
          paragraphId:
            'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/regions/0003_urn-gvn-EVDO01-IIAV002_IAV001000030-large_03/r_1077',
          position: 7,
        },
        {
          id: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/regions/0003_urn-gvn-EVDO01-IIAV002_IAV001000030-large_03/r_1077-tr_1_tl_16',
          paragraphId:
            'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/regions/0003_urn-gvn-EVDO01-IIAV002_IAV001000030-large_03/r_1077',
          position: 8,
        },
        {
          id: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/regions/0003_urn-gvn-EVDO01-IIAV002_IAV001000030-large_03/r_1077-tr_1_tl_17',
          paragraphId:
            'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/regions/0003_urn-gvn-EVDO01-IIAV002_IAV001000030-large_03/r_1077',
          position: 9,
        },
        {
          id: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/regions/0003_urn-gvn-EVDO01-IIAV002_IAV001000030-large_03/r_1077-tr_1_tl_18',
          paragraphId:
            'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/regions/0003_urn-gvn-EVDO01-IIAV002_IAV001000030-large_03/r_1077',
          position: 10,
        },
        {
          id: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/regions/0003_urn-gvn-EVDO01-IIAV002_IAV001000030-large_03/r_1077-tr_1_tl_19',
          paragraphId:
            'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/regions/0003_urn-gvn-EVDO01-IIAV002_IAV001000030-large_03/r_1077',
          position: 11,
        },
        {
          id: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/regions/0003_urn-gvn-EVDO01-IIAV002_IAV001000030-large_03/r_1077-tr_1_tl_20',
          paragraphId:
            'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/regions/0003_urn-gvn-EVDO01-IIAV002_IAV001000030-large_03/r_1077',
          position: 12,
        },
        {
          id: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/regions/0003_urn-gvn-EVDO01-IIAV002_IAV001000030-large_03/r_1077-tr_1_tl_21',
          paragraphId:
            'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/regions/0003_urn-gvn-EVDO01-IIAV002_IAV001000030-large_03/r_1077',
          position: 13,
        },
        {
          id: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/regions/0003_urn-gvn-EVDO01-IIAV002_IAV001000030-large_03/r_1077-line_1690982669202_88',
          paragraphId:
            'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/regions/0003_urn-gvn-EVDO01-IIAV002_IAV001000030-large_03/r_1077',
          position: 14,
        },
        {
          id: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/regions/0003_urn-gvn-EVDO01-IIAV002_IAV001000030-large_03/r_1077-tr_1_tl_24',
          paragraphId:
            'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/regions/0003_urn-gvn-EVDO01-IIAV002_IAV001000030-large_03/r_1077',
          position: 15,
        },
        {
          id: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/regions/0003_urn-gvn-EVDO01-IIAV002_IAV001000030-large_03/r_1077-line_1690982677443_93',
          paragraphId:
            'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/regions/0003_urn-gvn-EVDO01-IIAV002_IAV001000030-large_03/r_1077',
          position: 16,
        },
        {
          id: 'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/regions/0003_urn-gvn-EVDO01-IIAV002_IAV001000030-large_03/r_1077-l_381',
          paragraphId:
            'https://id.amsterdamtimemachine.nl/ark:/81741/amsterdam-diaries/annotations/regions/0003_urn-gvn-EVDO01-IIAV002_IAV001000030-large_03/r_1077',
          position: 17,
        },
      ],
    });
  });
});
