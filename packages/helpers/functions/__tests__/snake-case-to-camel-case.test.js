import snakeCaseToCamelCase from '../snake-case-to-camel-case';

describe('snakeCaseToCamelCase helper', () => {
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
