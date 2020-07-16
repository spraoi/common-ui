import isJSON from './is-json';

const parseEntity = (payload) => {
  const isJson = isJSON(payload);
  const parsed = isJson ? JSON.parse(payload) : payload;
  const isArray = Array.isArray(parsed);
  const isNull = parsed === null;

  return {
    isArray,
    isBoolean: typeof parsed === 'boolean',
    isJson,
    isNull,
    isNumber: typeof parsed === 'number',
    isObject: typeof parsed === 'object' && !isNull && !isArray,
    isString: typeof parsed === 'string',
    isSymbol: typeof parsed === 'symbol',
    isUndefined: typeof parsed === 'undefined',
    payload: parsed,
  };
};

export default parseEntity;
