import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const valueAtBp = (value, bp) => {
  if (value === null || typeof value !== 'object') return value;
  return value[bp];
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

const Box = styled.div`
  ${p => boxStylesAtBreakpoint(p, 'none')};

  @media (min-width: ${p => p.theme.breakpoints.xs}) {
    ${p => boxStylesAtBreakpoint(p, 'xs')};
  }

  @media (min-width: ${p => p.theme.breakpoints.sm}) {
    ${p => boxStylesAtBreakpoint(p, 'sm')};
  }

  @media (min-width: ${p => p.theme.breakpoints.md}) {
    ${p => boxStylesAtBreakpoint(p, 'md')};
  }

  @media (min-width: ${p => p.theme.breakpoints.lg}) {
    ${p => boxStylesAtBreakpoint(p, 'lg')};
  }

  @media (min-width: ${p => p.theme.breakpoints.xl}) {
    ${p => boxStylesAtBreakpoint(p, 'xl')};
  }
`;

const styleType = PropTypes.oneOfType([
  PropTypes.shape({
    lg: PropTypes.string,
    md: PropTypes.string,
    sm: PropTypes.string,
    xl: PropTypes.string,
    xs: PropTypes.string,
  }),
  PropTypes.string,
]);

Box.propTypes = {
  alignItems: styleType,
  bg: styleType,
  borderRadius: styleType,
  boxShadow: styleType,
  color: styleType,
  display: styleType,
  fontFamily: styleType,
  fontSize: styleType,
  fontWeight: styleType,
  height: styleType,
  justifyContent: styleType,
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
  textAlign: styleType,
  width: styleType,
};

Box.defaultProps = {
  alignItems: null,
  bg: null,
  borderRadius: null,
  boxShadow: null,
  color: null,
  display: null,
  fontFamily: null,
  fontSize: null,
  fontWeight: null,
  height: null,
  justifyContent: null,
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
  textAlign: null,
  width: null,
};

export default Box;
