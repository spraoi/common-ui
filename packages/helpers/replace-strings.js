import parseEntity from './parse-entity';

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
  skip = false,
  valueFunction,
}) => {
  const parsed = parseEntity(payload);
  let replaced = parsed.payload;

  if (!skip && valueFunction(parsed.payload)) {
    replaced = replaceFunction({ value: parsed.payload });
  } else if (parsed.isArray) {
    replaced = parsed.payload.map((value) =>
      replaceStrings({
        currentPath,
        ignorePaths,
        keyFunction,
        payload: value,
        replaceFunction,
        valueFunction,
      })
    );
  } else if (parsed.isObject) {
    replaced = Object.entries(parsed.payload).reduce((acc, [key, value]) => {
      const newPath = `${currentPath ? `${currentPath}.` : ''}${key}`;
      const skip = !keyFunction(key);

      if (ignorePaths.includes(newPath)) {
        return { ...acc, [key]: value };
      }

      if (!skip && valueFunction(value)) {
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
          skip,
          valueFunction,
        }),
      };
    }, {});
  }

  if (parsed.isJson) return JSON.stringify(replaced);
  return replaced;
};

export default replaceStrings;
