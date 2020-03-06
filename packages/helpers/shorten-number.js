const shortenNumber = number => {
  if (number < 0) return '<0';
  if (number === 0) return '0';
  if (number < 1) return '<1';
  const base = Math.floor(number);

  const shorten = (size, suffix) => {
    const parts = size.toString().split('.');
    const fraction = parts[1] ? parts[1].substring(0, 2) : null;
    if (!fraction || /^0+$/.test(fraction)) return `${parts[0]}${suffix}`;
    return `${parts[0]}.${fraction}${suffix}`;
  };

  let size = base / 1e15;
  if (size >= 1) return shorten(size, 'Q');

  size = base / 1e12;
  if (size >= 1) return shorten(size, 'T');

  size = base / 1e9;
  if (size >= 1) return shorten(size, 'B');

  size = base / 1e6;
  if (size >= 1) return shorten(size, 'M');

  size = base / 1e3;
  if (size >= 1) return shorten(size, 'K');

  return base.toString();
};

export default shortenNumber;
