import get from 'lodash/get';

const themeVariantToValue = (theme, type, variant) => {
  const variantValue = get(theme, ['variants', ...variant.split('.')], '');
  return get(theme, `${type}.${variantValue}`, variantValue);
};

export default themeVariantToValue;
