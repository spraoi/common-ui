const parseUuid = id => {
  const res = {};
  if (!id) return res;
  const splitId = id.split(':');
  if (splitId.length === 6) res.version = Number(splitId.pop());
  res.id = splitId.join(':');
  res.code = splitId.pop();
  return res;
};

export default parseUuid;
