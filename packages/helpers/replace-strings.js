import parseJsonOrObject from './parse-json-or-object';

/**
 * Executes replaceFunction against key/value pairs when keyFunction &
 * valueFunction return true.
 */
const replaceStrings = ({
  currentPath,
  ignorePaths = [],
  keyFunction,
  payload,
  replaceFunction,
  valueFunction,
}) => {
  const parsed = parseJsonOrObject(payload);
  if (!parsed.isObject) return payload;

  const replaced = Array.isArray(parsed.payload)
    ? parsed.payload.map(value =>
        replaceStrings({
          currentPath,
          ignorePaths,
          keyFunction,
          payload: value,
          replaceFunction,
          valueFunction,
        })
      )
    : Object.entries(parsed.payload).reduce((acc, [key, value]) => {
        const newPath = `${currentPath ? `${currentPath}.` : ''}${key}`;
        if (ignorePaths.includes(newPath)) return { ...acc, [key]: value };

        if (keyFunction(key) && valueFunction(value)) {
          return { ...acc, ...replaceFunction({ key, value }) };
        }

        return {
          ...acc,
          [key]: replaceStrings({
            currentPath: newPath,
            ignorePaths,
            keyFunction,
            payload: value,
            replaceFunction,
            valueFunction,
          }),
        };
      }, {});

  return parsed.isJson ? JSON.stringify(replaced) : replaced;
};

export default replaceStrings;
