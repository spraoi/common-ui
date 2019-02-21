import 'isomorphic-unfetch';
import AWSAppSyncClient from 'aws-appsync';
import PropTypes from 'prop-types';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { AuthProvider } from '@spraoi/auth';
import { Rehydrated } from 'aws-appsync-react';
import { ThemeProvider } from 'styled-components';
import StyledGlobal from './StyledGlobal';
import { configType, themeType } from './types';

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
              new AWSAppSyncClient({
                ...config.apollo,
                auth: { ...config.apollo.auth, credentials },
              })
            }
          >
            <Rehydrated loading={<></>}>{contents}</Rehydrated>
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
