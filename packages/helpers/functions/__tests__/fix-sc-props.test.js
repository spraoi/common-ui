import fixSCProps from '../fix-sc-props';

describe('fixSCProps helper', () => {
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
