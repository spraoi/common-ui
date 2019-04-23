import objectMapDeep from '../object-map-deep';

describe('objectMapDeep helper', () => {
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
