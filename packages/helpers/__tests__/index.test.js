import { objectMapDeep, snakeCaseToCamelCase } from '..';

describe('objectMapDeep', () => {
  it('should work', () => {
    expect(
      JSON.stringify(
        objectMapDeep(
          {
            bar: 1,
            baz: null,
            foo: 'bar',
            fooBar: false,
            fooBaz: ['foo'],
            fooFoo: undefined,
          },
          value => `${String(value)} mapped!`
        )
      )
    ).toEqual(
      JSON.stringify({
        bar: '1 mapped!',
        baz: 'null mapped!',
        foo: 'bar mapped!',
        fooBar: 'false mapped!',
        fooBaz: ['foo'],
        fooFoo: 'undefined mapped!',
      })
    );
  });
});

describe('snakeCaseToCamelCase', () => {
  it('should work', () => {
    expect(snakeCaseToCamelCase('foo_bar_baz')).toEqual('fooBarBaz');
  });
});
