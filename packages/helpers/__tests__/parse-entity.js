import parseEntity from '../parse-entity';

describe('parseEntity function', () => {
  test('should parse non objects correctly', () => {
    expect(parseEntity(null)).toEqual({
      isArray: false,
      isBoolean: false,
      isJson: false,
      isNull: true,
      isNumber: false,
      isObject: false,
      isString: false,
      isSymbol: false,
      isUndefined: false,
      payload: null,
    });
  });

  test('should parse objects correctly', () => {
    expect(parseEntity({})).toEqual({
      isArray: false,
      isBoolean: false,
      isJson: false,
      isNull: false,
      isNumber: false,
      isObject: true,
      isString: false,
      isSymbol: false,
      isUndefined: false,
      payload: {},
    });
  });

  test('should parse arrays correctly', () => {
    expect(parseEntity([])).toEqual({
      isArray: true,
      isBoolean: false,
      isJson: false,
      isNull: false,
      isNumber: false,
      isObject: false,
      isString: false,
      isSymbol: false,
      isUndefined: false,
      payload: [],
    });
  });

  test('should parse json correctly', () => {
    expect(parseEntity('{ "test": "foo" }')).toEqual({
      isArray: false,
      isBoolean: false,
      isJson: true,
      isNull: false,
      isNumber: false,
      isObject: true,
      isString: false,
      isSymbol: false,
      isUndefined: false,
      payload: { test: 'foo' },
    });
  });
});
