import Amplify from 'aws-amplify';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import resetStyles from 'styled-reset';
import { AuthHandler } from '@spraoi/auth';
import { Authenticator } from 'aws-amplify-react/dist/Auth';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

const GlobalStyle = createGlobalStyle`${resetStyles}`;

export default class App extends PureComponent {
  static propTypes = {
    amplify: PropTypes.shape({}).isRequired,
    page: PropTypes.node.isRequired,
    theme: PropTypes.shape({}).isRequired,
  };

  componentWillMount() {
    const { amplify } = this.props;
    Amplify.configure(amplify);
  }

  render() {
    const { page, theme } = this.props;

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
  }
}
