const numTicksForWidth = width => {
  if (width <= 300) return 2;
  if (width > 300 && width <= 400) return 5;
  return 10;
};

export default numTicksForWidth;
