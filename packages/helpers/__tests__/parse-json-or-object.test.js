import parseJsonOrObject from '../parse-json-or-object';

describe('parseJsonOrObject function', () => {
  test('should parse non objects correctly', () => {
    expect(parseJsonOrObject(null)).toEqual({
      isJson: false,
      isObject: false,
      payload: null,
    });
  });

  test('should parse objects correctly', () => {
    expect(parseJsonOrObject({})).toEqual({
      isJson: false,
      isObject: true,
      payload: {},
    });
  });

  test('should parse json correctly', () => {
    expect(parseJsonOrObject('{ "test": "foo" }')).toEqual({
      isJson: true,
      isObject: true,
      payload: { test: 'foo' },
    });
  });
});
