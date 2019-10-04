const theme = {
  baseFontSizesForBreakpoint: [],
  breakpoints: [],
  colors: {
    accent: 'green',
    black: 'black',
    body: 'white',
    border: 'gray',
    error: 'red',
    grays: ['gray', 'gray', 'gray', 'gray', 'gray'],
    primary: 'red',
    primaryLight: 'red',
    text: {
      heading: 'black',
      link: 'blue',
      primary: 'black',
      subtle: 'gray',
    },
    white: 'white',
  },
  fonts: {
    primary: 'sans-serif',
    secondary: 'serif',
  },
  fontSizes: [],
  fontWeights: {
    bold: 600,
    light: 200,
    normal: 400,
  },
  letterSpacings: [],
  lineHeights: [],
  radii: [],
  shadows: [],
  sizes: {
    maxWidths: {
      form: '500px',
    },
  },
  space: [],
  variants: {
    buttons: {
      primary: {
        '&:hover': { bg: 'primaryLight' },
        bg: 'primary',
        color: 'white',
      },
    },
    inputs: {
      primary: {
        '&::placeholder': { color: 'grays.1' },
        '&:focus': { borderColor: 'primary' },
        bg: 'white',
        borderColor: 'gray.1',
        borderStyle: 'solid',
        borderWidth: '1px',
        color: 'text.primary',
      },
    },
  },
  zIndices: [],
};

export default theme;
