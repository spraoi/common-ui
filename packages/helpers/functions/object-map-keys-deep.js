/**
 * Deeply map keys of an object.
 * @param {object} obj
 * @param {function} callback
 * @returns {object}
 */
const objectMapKeysDeep = (obj, callback) => {
  const out = {};

  Object.keys(obj).forEach(k => {
    out[callback(k)] =
      obj[k] !== null && !Array.isArray(obj[k]) && typeof obj[k] === 'object'
        ? objectMapKeysDeep(obj[k], callback)
        : obj[k];
  });

  return out;
};

export default objectMapKeysDeep;
