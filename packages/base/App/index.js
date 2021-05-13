import 'core-js/stable';
import 'isomorphic-unfetch';
import ApolloClient from 'apollo-client';
import PropTypes from 'prop-types';
import React from 'react';
import { ApolloLink } from 'apollo-link';
import { ApolloProvider } from 'react-apollo';
import { AuthContext, AuthProvider } from '@spraoi/auth';
import { HEADERS } from '@spraoi/helpers/constants';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createAuthLink } from 'aws-appsync-auth-link';
import { createHttpLink } from 'apollo-link-http';
import { createSubscriptionHandshakeLink } from 'aws-appsync-subscription-link';
import { setContext } from 'apollo-link-context';
import { v4 as uuidv4 } from 'uuid';
import AppBase from '../AppBase';

// does your component require a css import? put it here...
// https://github.com/webpack-contrib/mini-css-extract-plugin/issues/382
import '@brainhubeu/react-carousel/lib/style.css';
import 'filepond/dist/filepond.min.css';
import '@wojtekmaj/react-daterange-picker';

const cache = new InMemoryCache();

const App = ({ children, config, credentials, theme }) => (
  <AuthProvider amplifyConfig={config.amplify}>
    <AuthContext.Consumer>
      {({ jwt, user: { customActiveGroup } }) => (
        <ApolloProvider
          client={
            new ApolloClient({
              cache,
              link: ApolloLink.from([
                createAuthLink({
                  ...config.apollo,
                  auth: { ...config.apollo.auth, credentials },
                }),
                createSubscriptionHandshakeLink({
                  resultsFetcherLink: ApolloLink.from([
                    setContext((request, previousContext) => ({
                      headers: {
                        ...previousContext.headers,
                        [HEADERS.ACTIVE_GROUP]: customActiveGroup,
                        [HEADERS.JWT]: jwt,
                        [HEADERS.TRACE_ID]: uuidv4(),
                      },
                    })),
                    createHttpLink({ uri: config.apollo.url }),
                  ]),
                  url: config.apollo.url,
                }),
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
        region: PropTypes.oneOf(['us-east-1', 'us-east-2']),
        userPoolId: PropTypes.string,
        userPoolWebClientId: PropTypes.string,
      }),
      Storage: PropTypes.shape({
        bucket: PropTypes.string,
        region: PropTypes.oneOf(['us-east-1', 'us-east-2']),
      }),
    }),
    apollo: PropTypes.shape({
      auth: PropTypes.shape({
        type: PropTypes.oneOf(['AWS_IAM']),
      }),
      region: PropTypes.oneOf(['us-east-1', 'us-east-2']),
      url: PropTypes.string,
    }),
  }).isRequired,
  credentials: PropTypes.func.isRequired,
  theme: PropTypes.shape({}).isRequired,
};

export default App;
