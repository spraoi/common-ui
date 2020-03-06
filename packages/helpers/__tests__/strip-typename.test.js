import stripTypename from '../strip-typename';

describe('stripTypename', () => {
  it('should not do anything to non-objects', () => {
    expect(stripTypename(null)).toEqual(null);
    expect(stripTypename(1)).toEqual(1);
    expect(stripTypename(true)).toEqual(true);
    expect(stripTypename(undefined)).toEqual(undefined);
  });

  it('should remove __typenames from objects with __typenames', () => {
    expect(
      stripTypename({
        __typename: 'baz',
        foo: {
          __typename: 'baz',
          bar: {
            __typename: 'baz',
            baz: true,
            foo: [{ __typename: 'baz', bar: true }],
          },
        },
      })
    ).toEqual({ foo: { bar: { baz: true, foo: [{ bar: true }] } } });
  });
});
