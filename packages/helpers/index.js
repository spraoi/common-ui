/**
 * Deeply map values of an object.
 * @param {object} obj
 * @param {function} callback
 * @returns {object}
 */
export const objectMapDeep = (obj, callback) => {
  const out = {};

  Object.keys(obj).forEach(k => {
    if (Array.isArray(obj[k])) {
      out[k] = obj[k];
      return;
    }

    out[k] =
      obj[k] !== null && typeof obj[k] === 'object'
        ? objectMapDeep(obj[k], callback)
        : callback(obj[k], k);
  });

  return out;
};

/**
 * Convert a snake_case_string to a camelCaseString.
 * @param {*} string
 * @returns {*}
 */
export const snakeCaseToCamelCase = string => {
  if (typeof string !== 'string') return string;
  return string.replace(/(_\w)/g, match => match[1].toUpperCase());
};
