import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import React from 'react';
import resetStyles from 'styled-reset';
import { AuthHandler } from '@spraoi/auth';
import { Authenticator } from 'aws-amplify-react/dist/Auth';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

const GlobalStyle = createGlobalStyle`${resetStyles}`;

const App = ({ amplifyConfig, page, theme }) => (
  <React.Fragment>
    <Helmet />
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <Authenticator amplifyConfig={amplifyConfig} hideDefault>
        <AuthHandler page={page} />
      </Authenticator>
    </ThemeProvider>
  </React.Fragment>
);

App.propTypes = {
  amplifyConfig: PropTypes.shape({}).isRequired,
  page: PropTypes.node.isRequired,
  theme: PropTypes.shape({}).isRequired,
};

export default App;
