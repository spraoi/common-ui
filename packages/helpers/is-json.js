const isJSON = payload => {
  if (!payload) return false;

  try {
    JSON.parse(payload);
  } catch (e) {
    return false;
  }

  return true;
};

export default isJSON;
