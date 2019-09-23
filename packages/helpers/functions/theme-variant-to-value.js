import get from 'lodash/get';

/**
 * Parses variant theme values. Useful for overriding styles on third-party
 * components with our theme.
 *
 * @param theme
 * @param type
 * @param variant
 * @returns {*}
 */
const themeVariantToValue = (theme, type, variant) => {
  const variantValue = get(theme, ['variants', ...variant.split('.')], '');
  return get(theme, `${type}.${variantValue}`, variantValue);
};

export default themeVariantToValue;
