import { createGlobalStyle } from 'styled-components';

const StyledGlobal = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html {
    height: 100%;
    overflow-x: hidden;
    background-color: ${(p) => p.theme.colors.body};
    color: ${(p) => p.theme.colors.text.primary};
    font-family: ${(p) => p.theme.fonts.primary};
    font-size: ${(p) => p.theme.baseFontSizesForBreakpoint[0]};
    font-weight: ${(p) => p.theme.fontWeights.normal};

    @media (min-width: ${(p) => p.theme.breakpoints[0]}) {
      font-size: ${(p) => p.theme.baseFontSizesForBreakpoint[1]};
    }

    @media (min-width: ${(p) => p.theme.breakpoints[1]}) {
      font-size: ${(p) => p.theme.baseFontSizesForBreakpoint[2]};
    }

    @media (min-width: ${(p) => p.theme.breakpoints[2]}) {
      font-size: ${(p) => p.theme.baseFontSizesForBreakpoint[3]};
    }

    @media (min-width: ${(p) => p.theme.breakpoints[3]}) {
      font-size: ${(p) => p.theme.baseFontSizesForBreakpoint[4]};
    }
  }

  body {
    position: relative;
    width: 100%;
    min-height: 100%;
    margin: 0;
    padding: 0;
  }

  a {
    color: ${(p) => p.theme.colors.text.link};
    text-decoration: none;
  }

  button,
  input[type='button'],
  input[type='submit'] {
    padding: 0;
    border: none;
    background: none;
    color: inherit;
    font: inherit;
    cursor: pointer;
    outline: none;
  }

  textarea {
    display: block;
    resize: vertical;
  }

  a,
  input,
  button,
  textarea {
    font: inherit;
    outline: none;

    &:focus,
    &:active {
      outline: none;
    }

    &[type='radio'],
    &[type='checkbox'] {
      margin: 0;
    }
  }

  figure,
  h1,
  h2,
  h3,
  h4,
  li,
  p,
  pre,
  ul {
    margin: 0;
    padding: 0;
  }

  h1,
  h2,
  h3,
  h4 {
    color: ${(p) => p.theme.colors.text.heading};
    font-family: ${(p) => p.theme.fonts.secondary};
    font-weight: ${(p) => p.theme.fontWeights.bold};
  }

  h1 {
    font-size: ${(p) => p.theme.fontSizes[6]};
  }

  h2 {
    font-size: ${(p) => p.theme.fontSizes[5]};
  }

  h3 {
    font-size: ${(p) => p.theme.fontSizes[4]};
  }

  h4 {
    font-size: ${(p) => p.theme.fontSizes[3]};
  }

  ul {
    list-style: none;
  }

  hr {
    height: 1px;
    border: 0;
    background-color: ${(p) => p.theme.colors.border};
  }
`;

export default StyledGlobal;
