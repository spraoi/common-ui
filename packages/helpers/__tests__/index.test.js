import { objectMapDeep, snakeCaseToCamelCase } from '..';

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
