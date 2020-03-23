const numTicksForHeight = (height) => {
  if (height <= 300) return 3;
  if (height > 300 && height <= 600) return 5;
  return 10;
};

export default numTicksForHeight;
