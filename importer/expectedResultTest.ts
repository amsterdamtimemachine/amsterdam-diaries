import { it, expect } from 'vitest';

export default (input: ParsedResponse, expectedResults: Record<string, any>, limit: number = 500) => {
  for (const key in input) {
    const expectedKeys = expectedResults[key as keyof typeof expectedResults];
    const values = input[key as keyof typeof input]!;

    it(`Should return an object with ${key} array`, async () => {
      expect(Array.isArray(values)).toBeTruthy();
    });

    values.slice(0, limit).forEach((item, index) => {
      it(`Should parse into a valid ${key} #${index + 1}`, async () => {
        expect(Object.keys(item)).toEqual(expectedKeys);
      });
    });
  }
};
