import 'isomorphic-unfetch';
import PropTypes from 'prop-types';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import ErrorBoundary from './ErrorBoundary';
import StyledGlobal from './StyledGlobal';

const AppBase = ({ children, theme }) => (
  <ThemeProvider theme={theme}>
    <ErrorBoundary>
      <StyledGlobal theme={theme} />
      {children}
    </ErrorBoundary>
  </ThemeProvider>
);

AppBase.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.shape({}).isRequired,
};

export default AppBase;
