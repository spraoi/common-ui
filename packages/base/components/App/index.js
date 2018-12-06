import AWSAppSyncClient from 'aws-appsync';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { AuthProvider } from '@spraoi/auth';
import { Rehydrated } from 'aws-appsync-react';
import { ThemeProvider } from 'styled-components';
import StyledGlobal from './StyledGlobal';
import { amplifyConfigType, themeType } from './types';

const App = ({ children, config, theme }) => (
  <>
    <StyledGlobal theme={theme} />
    <Helmet />
    <ThemeProvider theme={theme}>
      <ApolloProvider client={new AWSAppSyncClient(config.apollo)}>
        <Rehydrated>
          <AuthProvider amplifyConfig={config.amplify}>{children}</AuthProvider>
        </Rehydrated>
      </ApolloProvider>
    </ThemeProvider>
  </>
);

App.propTypes = {
  amplifyConfig: amplifyConfigType.isRequired,
  children: PropTypes.node.isRequired,
  theme: themeType.isRequired,
};

export default App;
