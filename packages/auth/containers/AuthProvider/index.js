import Amplify, { Auth } from 'aws-amplify';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import objectMapKeysDeep from '@spraoi/helpers/object-map-deep';
import { camelCase } from 'change-case';
import AuthContext from '../../utilities/context';
import { AUTH_STATES } from './utilities/constants';

class AuthProvider extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      authState: AUTH_STATES.LOADING,
      authUser: {},
      jwt: null,
    };
  }

  async componentDidMount() {
    const { amplifyConfig } = this.props;
    Amplify.configure(amplifyConfig);
    await this.setAuthenticatedUser();
  }

  async setAuthenticatedUser() {
    try {
      const session = await Auth.currentSession();
      const { jwtToken: jwt, payload } = session.getIdToken();
      const authUser = objectMapKeysDeep(payload, camelCase);
      delete authUser.attributes;
      const newState = { authState: AUTH_STATES.SIGNED_IN, authUser, jwt };
      this.setState(newState);
      return newState;
    } catch (e) {
      const newState = {
        authState: AUTH_STATES.SIGNED_OUT,
        authUser: {},
        jwt: null,
      };

      this.setState(newState);
      return newState;
    }
  }

  completeNewPasswordChallenge = async ({ password, ...rest }) => {
    const { authUser } = this.state;
    await Auth.completeNewPassword(authUser, password, rest);
    return this.setAuthenticatedUser();
  };

  signIn = async ({ password, username }) => {
    const authUser = await Auth.signIn(username, password);

    if (authUser.challengeName === AUTH_STATES.NEW_PASSWORD_REQUIRED) {
      this.setState({ authState: AUTH_STATES.NEW_PASSWORD_REQUIRED, authUser });
    } else {
      return this.setAuthenticatedUser();
    }
  };

  signOut = async () => {
    await Auth.signOut();

    this.setState({
      authState: AUTH_STATES.SIGNED_OUT,
      authUser: {},
      jwt: null,
    });
  };

  signUp = async values => {
    await Auth.signUp(values);
    return Auth.signIn(values.username, values.password);
  };

  render() {
    const { children, homePath, loginPath } = this.props;
    const { authState, authUser, jwt } = this.state;

    return (
      <AuthContext.Provider
        value={{
          completeNewPasswordChallenge: this.completeNewPasswordChallenge,
          homePath,
          isAuthenticated: authState === AUTH_STATES.SIGNED_IN,
          isLoading: authState === AUTH_STATES.LOADING,
          jwt,
          loginPath,
          newPasswordRequired: authState === AUTH_STATES.NEW_PASSWORD_REQUIRED,
          signIn: this.signIn,
          signOut: this.signOut,
          signUp: this.signUp,
          user: authUser,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }
}

AuthProvider.propTypes = {
  amplifyConfig: PropTypes.shape({
    Auth: PropTypes.shape({
      identityPoolId: PropTypes.string.isRequired,
      userPoolId: PropTypes.string.isRequired,
      userPoolWebClientId: PropTypes.string.isRequired,
    }).isRequired,
    Storage: PropTypes.shape({
      bucket: PropTypes.string,
    }),
  }).isRequired,
  children: PropTypes.node.isRequired,
  homePath: PropTypes.string,
  loginPath: PropTypes.string,
};

AuthProvider.defaultProps = {
  homePath: '/',
  loginPath: '/login',
};

export default AuthProvider;
