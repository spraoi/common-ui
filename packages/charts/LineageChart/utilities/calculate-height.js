const calculateHeight = (data, vertexBgHeight) => {
  let height = 0;

  const scanData = obj => {
    Object.keys(obj).forEach(key => {
      if (key === 'children') {
        const children = obj[key];
        height += height ? children.length / 2 : children.length;
        children.forEach(scanData);
      }
    });
  };

  scanData(data);
  return `${height * vertexBgHeight}px`;
};

export default calculateHeight;
