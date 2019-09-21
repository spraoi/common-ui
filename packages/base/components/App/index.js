import 'isomorphic-unfetch';
import AWSAppSyncClient, { createAppSyncLink } from 'aws-appsync';
import PropTypes from 'prop-types';
import React from 'react';
import { ApolloLink } from 'apollo-link';
import { ApolloProvider } from 'react-apollo';
import { AuthContext, AuthProvider } from '@spraoi/auth';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { Rehydrated } from 'aws-appsync-react';
import { ThemeProvider } from 'styled-components';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import ErrorBoundary from './ErrorBoundary';
import StyledGlobal from './StyledGlobal';

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
        {({ jwt }) => (
          <ApolloProvider
            client={
              new AWSAppSyncClient(appSyncConfig, {
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
              })
            }
          >
            <Rehydrated loading={<></>}>{baseContent}</Rehydrated>
          </ApolloProvider>
        )}
      </AuthContext.Consumer>
    </AuthProvider>
  );
};

App.propTypes = {
  children: PropTypes.node.isRequired,
  config: PropTypes.shape({
    amplify: PropTypes.shape({
      Auth: PropTypes.shape({
        identityPoolId: PropTypes.string,
        region: PropTypes.oneOf(['us-east-1']),
        userPoolId: PropTypes.string,
        userPoolWebClientId: PropTypes.string,
      }),
      Storage: PropTypes.shape({
        bucket: PropTypes.string,
        region: PropTypes.oneOf(['us-east-1']),
      }),
    }),
    apollo: PropTypes.shape({
      auth: PropTypes.shape({
        type: PropTypes.oneOf(['AWS_IAM']),
      }),
      region: PropTypes.oneOf(['us-east-1']),
      url: PropTypes.string,
    }),
  }).isRequired,
  credentials: PropTypes.func,
  theme: PropTypes.shape({}).isRequired,
};

App.defaultProps = {
  credentials: null,
};

export default App;
