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
 * Shorten a number.
 * @param number
 * @returns {string}
 */
export const shortenNumber = number => {
  if (number < 1) return '<1';
  const base = Math.floor(number);

  const shorten = (size, suffix) => {
    const parts = size.toString().split('.');
    const fraction = parts[1] ? parts[1].substring(0, 2) : null;
    if (!fraction || /^0+$/.test(fraction)) return `${parts[0]}${suffix}`;
    return `${parts[0]}.${fraction}${suffix}`;
  };

  let size = base / 1e15;
  if (size >= 1) return shorten(size, 'Q');

  size = base / 1e12;
  if (size >= 1) return shorten(size, 'T');

  size = base / 1e9;
  if (size >= 1) return shorten(size, 'B');

  size = base / 1e6;
  if (size >= 1) return shorten(size, 'M');

  size = base / 1e3;
  if (size >= 1) return shorten(size, 'K');

  return base.toString();
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
