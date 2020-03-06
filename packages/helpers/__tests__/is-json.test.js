import isJson from '../is-json';

describe('isJson function', () => {
  test('should return false if the value is not a string', () => {
    expect(isJson(null)).toEqual(false);
    expect(isJson(undefined)).toEqual(false);
    expect(isJson(0)).toEqual(false);
    expect(isJson([])).toEqual(false);
    expect(isJson({})).toEqual(false);
  });

  test('should return false if the value is an invalid JSON string', () => {
    expect(isJson('foo')).toEqual(false);
  });

  test('should return true if the value is a valid JSON string', () => {
    expect(isJson('{ "foo": "bar" }')).toEqual(true);
  });
});
