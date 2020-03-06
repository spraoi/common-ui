/**
 * Removes __typename keys from an object.
 */
const stripTypename = data => {
  if (data === null) return data;
  if (Array.isArray(data)) return data.map(v => stripTypename(v));

  if (typeof data === 'object') {
    const newObj = {};

    Object.entries(data).forEach(([key, v]) => {
      if (key !== '__typename') newObj[key] = stripTypename(v);
    });

    return newObj;
  }

  return data;
};

export default stripTypename;
