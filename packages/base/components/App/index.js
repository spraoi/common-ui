import 'isomorphic-unfetch';
import AWSAppSyncClient from 'aws-appsync';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { AuthProvider } from '@spraoi/auth';
import { Rehydrated } from 'aws-appsync-react';
import { ThemeProvider } from 'styled-components';
import StyledGlobal from './StyledGlobal';
import { configType, themeType } from './types';

const App = ({ children, config, credentials, theme }) => (
  <ThemeProvider theme={theme}>
    <AuthProvider amplifyConfig={config.amplify}>
      <ApolloProvider
        client={
          new AWSAppSyncClient({
            ...config.apollo,
            auth: { ...config.apollo.auth, credentials },
          })
        }
      >
        <Rehydrated>
          <Helmet />
          <StyledGlobal theme={theme} />
          {children}
        </Rehydrated>
      </ApolloProvider>
    </AuthProvider>
  </ThemeProvider>
);

App.propTypes = {
  children: PropTypes.node.isRequired,
  config: configType.isRequired,
  credentials: PropTypes.func.isRequired,
  theme: themeType.isRequired,
};

export default App;
