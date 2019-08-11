import shortenNumber from '../shorten-number';

describe('shortenNumber', () => {
  [
    [-1, '<0'],
    [0, '0'],
    [0.3, '<1'],
    [10, '10'],
    [1000, '1K'],
    [1000.001, '1K'],
    [1500, '1.5K'],
    [10003, '10K'],
    [18000, '18K'],
    [1000000, '1M'],
    [1040000000, '1.04B'],
    [1000000000000, '1T'],
    [1000000000000000, '1Q'],
  ].forEach(([input, output]) =>
    it(`should shorten ${input} to ${output}`, () =>
      expect(shortenNumber(input)).toEqual(output))
  );
});
