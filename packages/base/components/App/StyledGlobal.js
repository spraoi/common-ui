import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html {
    overflow-x:hidden;
    height: 100%;
    background-color: ${p => p.theme.colors.body};
    color: ${p => p.theme.colors.textPrimary};
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
    width: 100%;
    min-height: 100%;
    margin: 0;
    padding: 0;
  }

  a {
    color: ${p => p.theme.colors.textLink};
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

    &[type='radio'] {
      margin: 0;
      transform: scale(1.4);
    }

    &::placeholder {
      color: ${p => p.theme.colors.inputPrimaryPlaceholderText};
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
    margin-bottom: ${p => p.theme.space.md};
    color: ${p => p.theme.colors.textHeading};
    font-family: ${p => p.theme.fonts.secondary};
    font-weight: ${p => p.theme.fontWeights.bold};
  }

  h1 {
    font-size: ${p => p.theme.fontSizes.xxl};
  }

  h2 {
    font-size: ${p => p.theme.fontSizes.xl};
  }

  h3 {
    font-size: ${p => p.theme.fontSizes.md};
  }

  h4 {
    font-size: ${p => p.theme.fontSizes.sm};
  }

  ul {
    list-style: none;
  }

  hr {
    height: 1px;
    margin-top: ${p => p.theme.space.lg};
    border: 0;
    background-color: ${p => p.theme.colors.border};
  }
`;
