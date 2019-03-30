import {
  fixSCProps,
  objectMapDeep,
  objectMapKeysDeep,
  shortenNumber,
  snakeCaseToCamelCase,
} from '..';

describe('fixSCProps', () => {
  it('should work', () => {
    expect(
      fixSCProps({
        bar: 1,
        baz: null,
        foo: 'bar',
        fooBar: false,
        fooBaz: true,
        fooFoo: undefined,
        nested: {
          bar: 1,
        },
      })
    ).toMatchObject({
      bar: 1,
      baz: null,
      foo: 'bar',
      fooBar: 0,
      fooBaz: 1,
      fooFoo: undefined,
      nested: {
        bar: 1,
      },
    });
  });
});

describe('objectMapDeep', () => {
  it('should work', () => {
    expect(
      objectMapDeep(
        {
          bar: 1,
          baz: null,
          foo: 'bar',
          fooBar: false,
          fooBaz: ['foo'],
          fooFoo: undefined,
          nested: {
            bar: 1,
          },
        },
        value => `${String(value)} mapped!`
      )
    ).toMatchObject({
      bar: '1 mapped!',
      baz: 'null mapped!',
      foo: 'bar mapped!',
      fooBar: 'false mapped!',
      fooBaz: ['foo'],
      fooFoo: 'undefined mapped!',
      nested: {
        bar: '1 mapped!',
      },
    });
  });
});

describe('objectMapKeysDeep', () => {
  it('should work', () => {
    expect(
      objectMapKeysDeep(
        {
          bar: 1,
          baz: null,
          foo: 'bar',
          fooBar: false,
          fooBaz: ['foo'],
          fooFoo: undefined,
          nested: {
            bar: 1,
          },
        },
        value => `${String(value)}_mapped`
      )
    ).toMatchObject({
      bar_mapped: 1,
      baz_mapped: null,
      foo_mapped: 'bar',
      fooBar_mapped: false,
      fooBaz_mapped: ['foo'],
      fooFoo_mapped: undefined,
      nested_mapped: {
        bar_mapped: 1,
      },
    });
  });
});

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

describe('snakeCaseToCamelCase', () => {
  it('should work', () => {
    expect(snakeCaseToCamelCase('foo_bar_baz')).toEqual('fooBarBaz');
  });

  it('should not touch an object', () => {
    expect(snakeCaseToCamelCase({})).toMatchObject({});
  });

  it('should not touch an array', () => {
    expect(snakeCaseToCamelCase([])).toMatchObject([]);
  });

  it('should not touch undefined', () => {
    expect(snakeCaseToCamelCase(undefined)).toEqual(undefined);
  });
});
