import { createGlobalStyle } from 'styled-components';

export const StyledGlobal = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  
  html {
    height: 100%;
    background-color: ${p => p.theme.colors.background};
    color: ${p => p.theme.colors.text};
    font-family: ${p => p.theme.fonts.primary};
    font-size: ${p => p.theme.baseFontSizeBeforeBreakpoint.xs};
    font-weight: ${p => p.theme.fontWeights.normal};

    @media (min-width: ${p => p.theme.breakpoints.xs}) {
      font-size: ${p => p.theme.baseFontSizeBeforeBreakpoint.sm};
    }

    @media (min-width: ${p => p.theme.breakpoints.sm}) {
      font-size: ${p => p.theme.baseFontSizeBeforeBreakpoint.md};
    }

    @media (min-width: ${p => p.theme.breakpoints.md}) {
      font-size: ${p => p.theme.baseFontSizeBeforeBreakpoint.lg};
    }

    @media (min-width: ${p => p.theme.breakpoints.lg}) {
      font-size: ${p => p.theme.baseFontSizeBeforeBreakpoint.xl};
    }
  }

  body {
    position: relative;
    min-height: 100%;
  }

  a {
    color: inherit;
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

  a,
  input,
  button {
    font: inherit;

    &:focus,
    &:active {
      outline: none;
    }
  }

  h1,
  h2,
  h3,
  h4,
  p,
  ul,
  li {
    margin: 0;
    padding: 0;
  }

  h1,
  h2,
  h3,
  h4 {
    font-size: inherit;
    font-weight: inherit;
  }

  ul {
    list-style: none;
  }

  pre {
    margin: 0;
  }
`;
