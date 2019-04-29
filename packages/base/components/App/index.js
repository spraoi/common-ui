import 'isomorphic-unfetch';
import AWSAppSyncClient, { createAppSyncLink } from 'aws-appsync';
import PropTypes from 'prop-types';
import React from 'react';
import { ApolloLink } from 'apollo-link';
import { ApolloProvider } from 'react-apollo';
import { AuthProvider } from '@spraoi/auth';
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
  const contents = (
    <>
      <StyledGlobal theme={theme} />
      {children}
    </>
  );

  return (
    <ThemeProvider theme={theme}>
      {credentials ? (
        <AuthProvider amplifyConfig={config.amplify}>
          <ApolloProvider
            client={
              new AWSAppSyncClient(
                {
                  ...config.apollo,
                  auth: {
                    ...config.apollo.auth,
                    credentials,
                  },
                },
                {
                  cache,
                  link: createAppSyncLink({
                    resultsFetcherLink: ApolloLink.from([
                      createHttpLink({ uri: config.apollo.url }),
                      setContext((request, previousContext) => ({
                        headers: {
                          ...previousContext.headers,
                          JWT: null,
                        },
                      })),
                    ]),
                  }),
                }
              )
            }
          >
            <Rehydrated loading={<></>}>
              <ErrorBoundary>{contents}</ErrorBoundary>
            </Rehydrated>
          </ApolloProvider>
        </AuthProvider>
      ) : (
        contents
      )}
    </ThemeProvider>
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
