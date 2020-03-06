import isJSON from './is-json';
import parseJsonOrObject from './parse-json-or-object';

/**
 * Extracts the values of key/value pairs when keyFunction & valueFunction
 * return true.
 */
const extractValues = ({
  currentPath,
  ignorePaths = [],
  keyFunction,
  payload,
  valueFunction,
}) => {
  const parsed = parseJsonOrObject(payload);
  if (!parsed.isObject) return [];

  const extracted = Object.entries(parsed.payload).reduce(
    (strings, [key, value]) => {
      const newPath = Number.isNaN(Number(key))
        ? `${currentPath ? `${currentPath}.` : ''}${key}`
        : currentPath;

      if (ignorePaths.includes(newPath)) return strings;

      if (typeof value === 'string' && !isJSON(value)) {
        return keyFunction(key) && valueFunction(value)
          ? [...strings, value]
          : strings;
      }

      return [
        ...strings,
        ...extractValues({
          currentPath: newPath,
          ignorePaths,
          keyFunction,
          payload: value,
          valueFunction,
        }),
      ];
    },
    []
  );

  return [...new Set(extracted)];
};

export default extractValues;
