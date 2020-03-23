const findVertexMaxWidth = (data) => {
  let maxWidth = 0;

  const scanData = (obj) => {
    Object.keys(obj).forEach((key) => {
      if (key === 'width') maxWidth = Math.max(obj[key], maxWidth);
      if (key === 'children') obj[key].forEach(scanData);
    });
  };

  scanData(data);
  return maxWidth;
};

export default findVertexMaxWidth;
