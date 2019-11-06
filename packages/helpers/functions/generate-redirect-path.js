import { parse, stringify } from 'query-string';

const generateRedirectPath = ({ pathname, search, queryParams }) => {
  const newSearch = stringify({ ...parse(search), ...queryParams });
  return `${pathname}${newSearch ? '?' : ''}${newSearch}`;
};

export default generateRedirectPath;
