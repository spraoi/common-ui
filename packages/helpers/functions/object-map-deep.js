/**
 * Deeply map values of an object.
 * @param {object} obj
 * @param {function} callback
 * @returns {object}
 */
const objectMapDeep = (obj, callback) => {
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

export default objectMapDeep;
