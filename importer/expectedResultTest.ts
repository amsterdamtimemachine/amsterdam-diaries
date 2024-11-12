import { it, expect } from 'vitest';

export default (input: ParsedResponse, expectedResults: Record<string, any>) => {
  for (const key in input) {
    const expectedResult = expectedResults[key as keyof typeof expectedResults];
    const values = input[key as keyof typeof input]!;

    it(`Should return ${expectedResult.length} ${key}`, async () => {
      expect(values.length).toBe(expectedResult.length);
    });

    values.forEach((item, index) => {
      it(`Should parse ${key} #${index + 1} correctly`, async () => {
        expect(item).toEqual(expectedResult[index]);
      });
    });
  }
};
