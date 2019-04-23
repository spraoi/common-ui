import objectMapKeysDeep from '../object-map-keys-deep';

describe('objectMapKeysDeep helper', () => {
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
