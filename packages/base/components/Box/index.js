import PropTypes from 'prop-types';
import React from 'react';
import styled, { css } from 'styled-components';

const BP = {
  lg: 'lg',
  md: 'md',
  none: 'none',
  sm: 'sm',
  xl: 'xl',
  xs: 'xs',
};

const valueAtBp = (value, bp) => {
  if (value === null || typeof value !== 'object') return value;

  if (bp === BP.none) {
    return value[bp];
  }

  if (bp === BP.xs) {
    return value[bp] || value[BP.none];
  }

  if (bp === BP.sm) {
    return value[bp] || value[BP.xs] || value[BP.none];
  }

  if (bp === BP.md) {
    return value[bp] || value[BP.sm] || value[BP.xs] || value[BP.none];
  }

  if (bp === BP.lg) {
    return (
      value[bp] ||
      value[BP.md] ||
      value[BP.sm] ||
      value[BP.xs] ||
      value[BP.none]
    );
  }

  if (bp === 'xl') {
    return (
      value[bp] ||
      value[BP.lg] ||
      value[BP.md] ||
      value[BP.sm] ||
      value[BP.xs] ||
      value[BP.none]
    );
  }
};

const themeValue = (theme, props, or, bp) => {
  const value = props.find(p => p) || or;
  return theme[valueAtBp(value, bp)] || valueAtBp(value, bp);
};

const boxStylesAtBreakpoint = (p, bp) => css`
  position: ${valueAtBp(p.position, bp)};
  display: ${valueAtBp(p.display, bp)};
  justify-content: ${valueAtBp(p.justifyContent, bp)};
  align-items: ${valueAtBp(p.alignItems, bp)};
  top: ${valueAtBp(p.top, bp)};
  right: ${valueAtBp(p.right, bp)};
  bottom: ${valueAtBp(p.bottom, bp)};
  left: ${valueAtBp(p.left, bp)};
  width: ${valueAtBp(p.width, bp)};
  height: ${valueAtBp(p.height, bp)};
  max-width: ${themeValue(p.theme.maxWidths, [p.maxWidth], p.maxWidth, bp)};
  margin: ${themeValue(p.theme.space, [p.mt, p.my, p.m], 0, bp)}
    ${themeValue(p.theme.space, [p.mr, p.mx, p.m], 0, bp)}
    ${themeValue(p.theme.space, [p.mb, p.my, p.m], 0, bp)}
    ${themeValue(p.theme.space, [p.ml, p.mx, p.m], 0, bp)};
  padding: ${themeValue(p.theme.space, [p.pt, p.py, p.p], 0, bp)}
    ${themeValue(p.theme.space, [p.pr, p.px, p.p], 0, bp)}
    ${themeValue(p.theme.space, [p.pb, p.py, p.p], 0, bp)}
    ${themeValue(p.theme.space, [p.pl, p.px, p.p], 0, bp)};
  border-radius: ${themeValue(
    p.theme.radii,
    [p.borderRadius],
    p.borderRadius,
    bp
  )};
  background: ${themeValue(p.theme.colors, [p.bg], p.bg, bp)};
  box-shadow: ${themeValue(p.theme.boxShadows, [p.boxShadow], p.boxShadow, bp)};
  color: ${themeValue(p.theme.colors, [p.color], p.color, bp)};
  font-family: ${themeValue(p.theme.fonts, [p.fontFamily], p.fontFamily, bp)};
  font-size: ${themeValue(p.theme.fontSizes, [p.fontSize], p.fontSize, bp)};
  font-weight: ${themeValue(
    p.theme.fontWeights,
    [p.fontWeight],
    p.fontWeight,
    bp
  )};
  letter-spacing: ${themeValue(
    p.theme.letterSpacings,
    [p.letterSpacing],
    p.letterSpacing,
    bp
  )};
  line-height: ${themeValue(
    p.theme.lineHeights,
    [p.lineHeight],
    p.lineHeight,
    bp
  )};
  text-align: ${valueAtBp(p.textAlign, bp)};
`;

const Box = styled(
  ({
    alignItems,
    bg,
    borderRadius,
    bottom,
    boxShadow,
    color,
    display,
    fontFamily,
    fontSize,
    fontWeight,
    height,
    justifyContent,
    left,
    letterSpacing,
    lineHeight,
    maxWidth,
    mb,
    ml,
    mr,
    mt,
    mx,
    my,
    pb,
    pl,
    position,
    pr,
    pt,
    px,
    py,
    right,
    textAlign,
    top,
    width,
    ...rest
  }) => <div {...rest} />
)`
  ${p => boxStylesAtBreakpoint(p, BP.none)};

  @media (min-width: ${p => p.theme.breakpoints.xs}) {
    ${p => boxStylesAtBreakpoint(p, BP.xs)};
  }

  @media (min-width: ${p => p.theme.breakpoints.sm}) {
    ${p => boxStylesAtBreakpoint(p, BP.sm)};
  }

  @media (min-width: ${p => p.theme.breakpoints.md}) {
    ${p => boxStylesAtBreakpoint(p, BP.md)};
  }

  @media (min-width: ${p => p.theme.breakpoints.lg}) {
    ${p => boxStylesAtBreakpoint(p, BP.lg)};
  }

  @media (min-width: ${p => p.theme.breakpoints.xl}) {
    ${p => boxStylesAtBreakpoint(p, BP.xl)};
  }
`;

const styleType = PropTypes.oneOfType([
  PropTypes.shape({
    [BP.lg]: PropTypes.string,
    [BP.md]: PropTypes.string,
    [BP.none]: PropTypes.string,
    [BP.sm]: PropTypes.string,
    [BP.xl]: PropTypes.string,
    [BP.xs]: PropTypes.string,
  }),
  PropTypes.string,
]);

Box.propTypes = {
  alignItems: styleType,
  bg: styleType,
  borderRadius: styleType,
  bottom: styleType,
  boxShadow: styleType,
  color: styleType,
  display: styleType,
  fontFamily: styleType,
  fontSize: styleType,
  fontWeight: styleType,
  height: styleType,
  justifyContent: styleType,
  left: styleType,
  letterSpacing: styleType,
  lineHeight: styleType,
  maxWidth: styleType,
  mb: styleType,
  ml: styleType,
  mr: styleType,
  mt: styleType,
  mx: styleType,
  my: styleType,
  pb: styleType,
  pl: styleType,
  position: styleType,
  pr: styleType,
  pt: styleType,
  px: styleType,
  py: styleType,
  right: styleType,
  textAlign: styleType,
  top: styleType,
  width: styleType,
};

Box.defaultProps = {
  alignItems: null,
  bg: null,
  borderRadius: null,
  bottom: null,
  boxShadow: null,
  color: null,
  display: null,
  fontFamily: null,
  fontSize: null,
  fontWeight: null,
  height: null,
  justifyContent: null,
  left: null,
  letterSpacing: null,
  lineHeight: null,
  maxWidth: null,
  mb: null,
  ml: null,
  mr: null,
  mt: null,
  mx: null,
  my: null,
  pb: null,
  pl: null,
  position: null,
  pr: null,
  pt: null,
  px: null,
  py: null,
  right: null,
  textAlign: null,
  top: null,
  width: null,
};

export default Box;
