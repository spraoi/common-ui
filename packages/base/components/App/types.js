import PropTypes from 'prop-types';

export const amplifyConfigType = PropTypes.shape({});

export const themeType = PropTypes.shape({
  baseFontSizeBeforeBreakpoint: PropTypes.shape({
    lg: PropTypes.string.isRequired,
    md: PropTypes.string.isRequired,
    sm: PropTypes.string.isRequired,
    xl: PropTypes.string.isRequired,
    xs: PropTypes.string.isRequired,
  }),
  boxShadows: PropTypes.shape({
    md: PropTypes.string.isRequired,
  }),
  breakpoints: PropTypes.shape({
    lg: PropTypes.string.isRequired,
    md: PropTypes.string.isRequired,
    sm: PropTypes.string.isRequired,
    xl: PropTypes.string.isRequired,
    xs: PropTypes.string.isRequired,
  }),
  colors: PropTypes.shape({
    background: PropTypes.string.isRequired,
    backgroundDark: PropTypes.string.isRequired,
    backgroundDarker: PropTypes.string.isRequired,
    backgroundLight: PropTypes.string.isRequired,
    backgroundLighter: PropTypes.string.isRequired,
    black: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired,
    primary: PropTypes.string.isRequired,
    primaryDark: PropTypes.string.isRequired,
    primaryDarker: PropTypes.string.isRequired,
    primaryLight: PropTypes.string.isRequired,
    primaryLighter: PropTypes.string.isRequired,
    secondary: PropTypes.string.isRequired,
    secondaryDark: PropTypes.string.isRequired,
    secondaryDarker: PropTypes.string.isRequired,
    secondaryLight: PropTypes.string.isRequired,
    secondaryLighter: PropTypes.string.isRequired,
    success: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    textLight: PropTypes.string.isRequired,
    textLighter: PropTypes.string.isRequired,
    warning: PropTypes.string.isRequired,
    white: PropTypes.string.isRequired,
  }),
  fonts: PropTypes.shape({
    mono: PropTypes.string.isRequired,
    primary: PropTypes.string.isRequired,
    secondary: PropTypes.string.isRequired,
  }),
  fontSizes: PropTypes.shape({
    hero: PropTypes.string.isRequired,
    lg: PropTypes.string.isRequired,
    md: PropTypes.string.isRequired,
    sm: PropTypes.string.isRequired,
    xl: PropTypes.string.isRequired,
    xs: PropTypes.string.isRequired,
    xxl: PropTypes.string.isRequired,
    xxs: PropTypes.string.isRequired,
  }),
  fontWeights: PropTypes.shape({
    bold: PropTypes.number.isRequired,
    light: PropTypes.number.isRequired,
    normal: PropTypes.number.isRequired,
  }),
  letterSpacings: PropTypes.shape({
    lg: PropTypes.string.isRequired,
    md: PropTypes.string.isRequired,
    sm: PropTypes.string.isRequired,
  }),
  lineHeights: PropTypes.shape({
    md: PropTypes.string.isRequired,
  }),
  radii: PropTypes.shape({
    md: PropTypes.string.isRequired,
  }),
  space: PropTypes.shape({
    hero: PropTypes.string.isRequired,
    lg: PropTypes.string.isRequired,
    md: PropTypes.string.isRequired,
    sm: PropTypes.string.isRequired,
    xl: PropTypes.string.isRequired,
    xs: PropTypes.string.isRequired,
    xxl: PropTypes.string.isRequired,
    xxs: PropTypes.string.isRequired,
  }),
  transitionSpeeds: PropTypes.shape({
    fast: PropTypes.string.isRequired,
    normal: PropTypes.string.isRequired,
    slow: PropTypes.string.isRequired,
  }).isRequired,
});
