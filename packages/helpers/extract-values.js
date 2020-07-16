import isJSON from './is-json';
import parseEntity from './parse-entity';

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
  const parsed = parseEntity(payload);
  if (!parsed.isObject && !parsed.isArray) return [];

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
