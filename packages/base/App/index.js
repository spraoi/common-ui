import 'isomorphic-unfetch';
import ApolloClient from 'apollo-client';
import PropTypes from 'prop-types';
import React from 'react';
import { ApolloLink } from 'apollo-link';
import { ApolloProvider } from 'react-apollo';
import { AuthContext, AuthProvider } from '@spraoi/auth';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createAuthLink } from 'aws-appsync-auth-link';
import { createHttpLink } from 'apollo-link-http';
import { createSubscriptionHandshakeLink } from 'aws-appsync-subscription-link';
import { setContext } from 'apollo-link-context';
import AppBase from '../AppBase';

const App = ({ children, config, credentials, theme }) => (
  <AuthProvider amplifyConfig={config.amplify}>
    <AuthContext.Consumer>
      {({ jwt }) => (
        <ApolloProvider
          client={
            new ApolloClient({
              cache: new InMemoryCache(),
              link: ApolloLink.from([
                createAuthLink({
                  ...config.apollo,
                  auth: { ...config.apollo.auth, credentials },
                }),
                createSubscriptionHandshakeLink(
                  config.apollo.url,
                  ApolloLink.from([
                    setContext((request, previousContext) => ({
                      headers: { ...previousContext.headers, jwt },
                    })),
                    createHttpLink({ uri: config.apollo.url }),
                  ])
                ),
              ]),
            })
          }
        >
          <AppBase theme={theme}>{children}</AppBase>
        </ApolloProvider>
      )}
    </AuthContext.Consumer>
  </AuthProvider>
);

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
  credentials: PropTypes.func.isRequired,
  theme: PropTypes.shape({}).isRequired,
};

export default App;