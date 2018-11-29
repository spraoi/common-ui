import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import React from 'react';
import { Authenticator } from '@spraoi/auth';
import { ThemeProvider } from 'styled-components';
import { StyledGlobal } from './styled';
import { amplifyConfigType, themeType } from './types';

const App = ({ amplifyConfig, page, theme }) => (
  <>
    <StyledGlobal theme={theme} />
    <Helmet />
    <ThemeProvider theme={theme}>
      <Authenticator amplifyConfig={amplifyConfig} page={page} />
    </ThemeProvider>
  </>
);

App.propTypes = {
  amplifyConfig: amplifyConfigType.isRequired,
  page: PropTypes.node.isRequired,
  theme: themeType.isRequired,
};

export default App;
