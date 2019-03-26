/**
 * Convert boolean props to 0 and 1.
 * See: https://github.com/styled-components/styled-components/issues/439
 * @param {object} props
 * @returns {object}
 */
export const fixSCProps = props => {
  const fixedProps = {};

  Object.keys(props).forEach(key => {
    let value = props[key];
    if (props[key] === true) value = 1;
    if (props[key] === false) value = 0;
    fixedProps[key] = value;
  });

  return fixedProps;
};

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
        : callback(obj[k]);
  });

  return out;
};

/**
 * Deeply map keys of an object.
 * @param {object} obj
 * @param {function} callback
 * @returns {object}
 */
export const objectMapKeysDeep = (obj, callback) => {
  const out = {};

  Object.keys(obj).forEach(k => {
    out[callback(k)] =
      obj[k] !== null && !Array.isArray(obj[k]) && typeof obj[k] === 'object'
        ? objectMapKeysDeep(obj[k], callback)
        : obj[k];
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
