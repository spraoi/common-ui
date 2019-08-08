import 'isomorphic-unfetch';
import AWSAppSyncClient, { createAppSyncLink } from 'aws-appsync';
import PropTypes from 'prop-types';
import React from 'react';
import { ApolloLink } from 'apollo-link';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks';
import { AuthContext, AuthProvider } from '@spraoi/auth';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { Rehydrated } from 'aws-appsync-react';
import { ThemeProvider } from 'styled-components';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import ErrorBoundary from './ErrorBoundary';
import StyledGlobal from './StyledGlobal';
import { configType, themeType } from './types';

const cache = new InMemoryCache();

const App = ({ children, config, credentials, theme }) => {
  const baseContent = (
    <ThemeProvider theme={theme}>
      <ErrorBoundary>
        <StyledGlobal theme={theme} />
        {children}
      </ErrorBoundary>
    </ThemeProvider>
  );

  if (!credentials) return baseContent;

  const appSyncConfig = {
    ...config.apollo,
    auth: {
      ...config.apollo.auth,
      credentials,
    },
  };

  return (
    <AuthProvider amplifyConfig={config.amplify}>
      <AuthContext.Consumer>
        {({ jwt }) => {
          const client = new AWSAppSyncClient(appSyncConfig, {
            cache,
            link: createAppSyncLink({
              ...appSyncConfig,
              resultsFetcherLink: ApolloLink.from([
                setContext((request, previousContext) => ({
                  headers: { ...previousContext.headers, jwt },
                })),
                createHttpLink({ uri: config.apollo.url }),
              ]),
            }),
          });

          return (
            <ApolloProvider client={client}>
              <ApolloHooksProvider client={client}>
                <Rehydrated loading={<></>}>{baseContent}</Rehydrated>
              </ApolloHooksProvider>
            </ApolloProvider>
          );
        }}
      </AuthContext.Consumer>
    </AuthProvider>
  );
};

App.propTypes = {
  children: PropTypes.node.isRequired,
  config: configType.isRequired,
  credentials: PropTypes.func,
  theme: themeType.isRequired,
};

App.defaultProps = {
  credentials: null,
};

export default App;
