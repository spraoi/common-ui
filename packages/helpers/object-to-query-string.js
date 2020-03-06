/**
 * input: { foo: 'bar', baz: ['foo', 'bar'], baz: 'foo,bar' }
 * output: '?foo=bar&baz=foo&baz=bar&baz=foo&baz=bar'
 */
export default obj => {
  if (!obj) return '';
  let paramCount = 0;

  const appendToString = (str, key, val) => {
    const delimiter = paramCount ? '&' : '?';
    paramCount += 1;

    return [
      str,
      delimiter,
      encodeURIComponent(key),
      '=',
      encodeURIComponent(val),
    ].join('');
  };

  return Object.keys(obj).reduce((originalStr, key) => {
    let str = originalStr;
    let value = obj[key];

    if (value && value.constructor === String) {
      const splitValue = value.split(',');
      if (splitValue.length > 1) value = splitValue;
    }

    if (value && value.constructor === Array) {
      value
        .filter(arrVal => arrVal !== null)
        .forEach(arrVal => {
          str = appendToString(str, key, arrVal);
        });

      return str;
    }

    return appendToString(str, key, value);
  }, '');
};
