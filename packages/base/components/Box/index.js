import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { blacklistProps } from '@spraoi/helpers';

const boxProps = [
  'alignItems',
  'bg',
  'borderRadius',
  'bottom',
  'boxShadow',
  'color',
  'cursor',
  'display',
  'flexWrap',
  'fontFamily',
  'fontSize',
  'fontWeight',
  'height',
  'justifyContent',
  'left',
  'letterSpacing',
  'lineHeight',
  'm',
  'maxWidth',
  'mb',
  'ml',
  'mr',
  'mt',
  'mx',
  'my',
  'overflow',
  'p',
  'pb',
  'pl',
  'position',
  'pr',
  'pt',
  'px',
  'py',
  'right',
  'textAlign',
  'textDecoration',
  'top',
  'width',
  'wordWrap',
];

const boxBreakpoints = {
  lg: 'lg',
  md: 'md',
  none: 'none',
  sm: 'sm',
  xl: 'xl',
  xs: 'xs',
};

const valueAtBp = (value, bp) => {
  if (value === null || typeof value !== 'object') return value;

  if (bp === boxBreakpoints.none) {
    return value[bp];
  }

  if (bp === boxBreakpoints.xs) {
    return value[bp] || value[boxBreakpoints.none];
  }

  if (bp === boxBreakpoints.sm) {
    return value[bp] || value[boxBreakpoints.xs] || value[boxBreakpoints.none];
  }

  if (bp === boxBreakpoints.md) {
    return (
      value[bp] ||
      value[boxBreakpoints.sm] ||
      value[boxBreakpoints.xs] ||
      value[boxBreakpoints.none]
    );
  }

  if (bp === boxBreakpoints.lg) {
    return (
      value[bp] ||
      value[boxBreakpoints.md] ||
      value[boxBreakpoints.sm] ||
      value[boxBreakpoints.xs] ||
      value[boxBreakpoints.none]
    );
  }

  if (bp === 'xl') {
    return (
      value[bp] ||
      value[boxBreakpoints.lg] ||
      value[boxBreakpoints.md] ||
      value[boxBreakpoints.sm] ||
      value[boxBreakpoints.xs] ||
      value[boxBreakpoints.none]
    );
  }
};

const themeValue = (theme, props, fallback, bp) => {
  const value = props.find(p => p) || fallback;
  const valueAtBp = valueAtBp(value, bp);
  if (!theme) return valueAtBp;
  return theme[valueAtBp] || valueAtBp;
};

const boxStylesAtBreakpoint = (p, bp) => css`
  position: ${valueAtBp(p.position, bp)};
  display: ${valueAtBp(p.display, bp)};
  justify-content: ${valueAtBp(p.justifyContent, bp)};
  align-items: ${valueAtBp(p.alignItems, bp)};
  flex-wrap: ${valueAtBp(p.flexWrap, bp)};
  top: ${themeValue(p.theme.space, [p.top], null, bp)};
  right: ${themeValue(p.theme.space, [p.right], null, bp)};
  bottom: ${themeValue(p.theme.space, [p.bottom], null, bp)};
  left: ${themeValue(p.theme.space, [p.left], null, bp)};
  width: ${themeValue(p.theme.widths, [p.width], null, bp)};
  height: ${themeValue(p.theme.heights, [p.height], null, bp)};
  max-width: ${themeValue(p.theme.maxWidths, [p.maxWidth], null, bp)};
  margin: ${themeValue(p.theme.space, [p.m], null, bp)};
  margin-top: ${themeValue(p.theme.space, [p.mt, p.my], null, bp)};
  margin-right: ${themeValue(p.theme.space, [p.mr, p.mx], null, bp)};
  margin-bottom: ${themeValue(p.theme.space, [p.mb, p.my], null, bp)};
  margin-left: ${themeValue(p.theme.space, [p.ml, p.mx], null, bp)};
  padding: ${themeValue(p.theme.space, [p.p], null, bp)};
  padding-top: ${themeValue(p.theme.space, [p.pt, p.py], null, bp)};
  padding-right: ${themeValue(p.theme.space, [p.pr, p.px], null, bp)};
  padding-bottom: ${themeValue(p.theme.space, [p.pb, p.py], null, bp)};
  padding-left: ${themeValue(p.theme.space, [p.pl, p.px], null, bp)};
  border-radius: ${themeValue(
    p.theme.radii,
    [p.borderRadius],
    p.borderRadius,
    bp
  )};
  background: ${themeValue(p.theme.colors, [p.bg], p.bg, bp)};
  box-shadow: ${themeValue(p.theme.boxShadows, [p.boxShadow], null, bp)};
  overflow: ${valueAtBp(p.overflow, bp)};
  color: ${themeValue(p.theme.colors, [p.color], null, bp)};
  font-family: ${themeValue(p.theme.fonts, [p.fontFamily], null, bp)};
  font-size: ${themeValue(p.theme.fontSizes, [p.fontSize], null, bp)};
  font-weight: ${themeValue(p.theme.fontWeights, [p.fontWeight], null, bp)};
  letter-spacing: ${themeValue(
    p.theme.letterSpacings,
    [p.letterSpacing],
    null,
    bp
  )};
  line-height: ${themeValue(p.theme.lineHeights, [p.lineHeight], null, bp)};
  text-align: ${valueAtBp(p.textAlign, bp)};
  text-decoration: ${valueAtBp(p.textDecoration, bp)};
  word-wrap: ${valueAtBp(p.wordWrap, bp)};
  cursor: ${valueAtBp(p.cursor, bp)};
`;

const Box = styled(blacklistProps({ blacklist: boxProps }))`
  ${p => boxStylesAtBreakpoint(p, boxBreakpoints.none)};

  @media (min-width: ${p => p.theme.breakpoints.xs}) {
    ${p => boxStylesAtBreakpoint(p, boxBreakpoints.xs)};
  }

  @media (min-width: ${p => p.theme.breakpoints.sm}) {
    ${p => boxStylesAtBreakpoint(p, boxBreakpoints.sm)};
  }

  @media (min-width: ${p => p.theme.breakpoints.md}) {
    ${p => boxStylesAtBreakpoint(p, boxBreakpoints.md)};
  }

  @media (min-width: ${p => p.theme.breakpoints.lg}) {
    ${p => boxStylesAtBreakpoint(p, boxBreakpoints.lg)};
  }

  @media (min-width: ${p => p.theme.breakpoints.xl}) {
    ${p => boxStylesAtBreakpoint(p, boxBreakpoints.xl)};
  }
`;

const styleType = PropTypes.oneOfType([
  PropTypes.shape({
    [boxBreakpoints.lg]: PropTypes.string,
    [boxBreakpoints.md]: PropTypes.string,
    [boxBreakpoints.none]: PropTypes.string,
    [boxBreakpoints.sm]: PropTypes.string,
    [boxBreakpoints.xl]: PropTypes.string,
    [boxBreakpoints.xs]: PropTypes.string,
  }),
  PropTypes.string,
]);

Box.propTypes = boxProps.reduce(
  (sum, prop) => ({ ...sum, [prop]: styleType }),
  {}
);

Box.defaultProps = boxProps.reduce(
  (sum, prop) => ({ ...sum, [prop]: null }),
  {}
);

export default Box;
export { boxProps };
