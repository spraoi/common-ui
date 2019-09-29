export function parseHashParams() {
  return decodeURIComponent(window.location.hash)
    .substring(1)
    .split('&')
    .map(val => val.split('='))
    .reduce((acc, val) => ({ ...acc, [val[0]]: val[1] }), {});
}

export function parseLambdaError(error) {
  const splitString = ' failed with error ';
  const newError = (error.message || error).replace(/\+/g, ' ');

  if (new RegExp(splitString).test(newError)) {
    return JSON.parse(
      newError
        .split(splitString)[1]
        .trim()
        .slice(0, -1)
    );
  }

  return error;
}

export function trimObject(o) {
  if (o !== null && o !== undefined && typeof o === 'object') {
    return Array.isArray(o)
      ? o.map(item => trimObject(item))
      : Object.keys(o).reduce((result, key) => {
          result[key] = trimObject(o[key]);
          return result;
        }, {});
  }
  return typeof o === 'string' ? o.trim() : o;
}
