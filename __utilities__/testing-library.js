import React from 'react';
import { ThemeProvider } from 'styled-components';
import { fireEvent, render } from '@testing-library/react';
import theme from '../__stubs__/theme';

const Providers = props => <ThemeProvider theme={theme} {...props} />;

const customRender = (ui, options) =>
  render(ui, { wrapper: Providers, ...options });

export { fireEvent, customRender as render };
