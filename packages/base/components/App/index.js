import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import React from 'react';
import { AuthProvider } from '@spraoi/auth';
import { ThemeProvider } from 'styled-components';
import { StyledGlobal } from './styled';
import { amplifyConfigType, themeType } from './types';

const App = ({ amplifyConfig, children, theme }) => (
  <>
    <StyledGlobal theme={theme} />
    <Helmet />
    <ThemeProvider theme={theme}>
      <AuthProvider amplifyConfig={amplifyConfig}>{children}</AuthProvider>
    </ThemeProvider>
  </>
);

App.propTypes = {
  amplifyConfig: amplifyConfigType.isRequired,
  children: PropTypes.node.isRequired,
  theme: themeType.isRequired,
};

export default App;
