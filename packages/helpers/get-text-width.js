const getTextWidth = (text, { fontWeight, fontSize, fontFamily }) => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  context.font = `${fontWeight} ${fontSize} ${fontFamily}`;
  const metrics = context.measureText(text);
  return metrics.width;
};

export default getTextWidth;
