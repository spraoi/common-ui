/**
 * Convert a snake_case_string to a camelCaseString.
 * @param {*} string
 * @returns {*}
 */
const snakeCaseToCamelCase = string => {
  if (typeof string !== 'string') return string;
  return string.replace(/(_\w)/g, match => match[1].toUpperCase());
};

export default snakeCaseToCamelCase;
