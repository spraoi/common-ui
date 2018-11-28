import Amplify from 'aws-amplify';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import React from 'react';
import resetStyles from 'styled-reset';
import { AuthHandler } from '@spraoi/auth';
import { Authenticator } from 'aws-amplify-react/dist/Auth';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

const App = ({ amplify, page, theme }) => {
  Amplify.configure(amplify);
  const GlobalStyle = createGlobalStyle`${resetStyles}`;

  return (
    <React.Fragment>
      <Helmet />
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Authenticator hideDefault>
          <AuthHandler page={page} />
        </Authenticator>
      </ThemeProvider>
    </React.Fragment>
  );
};

App.propTypes = {
  amplify: PropTypes.shape({}).isRequired,
  page: PropTypes.node.isRequired,
  theme: PropTypes.shape({}).isRequired,
};

export default App;
