import Amplify, { Auth, Hub } from 'aws-amplify';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import isJSON from '@spraoi/helpers/is-json';
import objectMapKeysDeep from '@spraoi/helpers/object-map-keys-deep';
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

    // Listen for all auth events.
    Hub.listen('auth', ({ payload: { event } }) => {
      switch (event) {
        case 'signIn':
          this.setAuthenticatedUser({ bypassCache: true });
          break;
        case 'signOut':
          this.setState({
            authState: AUTH_STATES.SIGNED_OUT,
            authUser: {},
            jwt: null,
          });
          break;
        default:
          break;
      }
    });
  }

  async setAuthenticatedUser({ bypassCache } = { bypassCache: false }) {
    try {
      const session = await Auth.currentAuthenticatedUser({
        bypassCache,
      });

      const newState = {
        authState: AUTH_STATES.SIGNED_IN,
        authUser: Object.entries(
          objectMapKeysDeep(
            session.signInUserSession.idToken.payload,
            camelCase
          )
        ).reduce(
          (attributes, [key, value]) => ({
            ...attributes,
            [key]: isJSON(value) ? JSON.parse(value) : value,
          }),
          {}
        ),
        jwt: session.signInUserSession.accessToken.jwtToken,
      };

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
    if (!authUser.challengeName) return this.setAuthenticatedUser();
    this.setState({ authState: authUser.challengeName, authUser });
  };

  setFederatedSignIn = async (cognitoProvider) => {
    await Auth.federatedSignIn(cognitoProvider);
  };

  signOut = async () => {
    await Auth.signOut();
  };

  signUp = async (values) => {
    await Auth.signUp(values);
    return Auth.signIn(values.username, values.password);
  };

  updateUserAttributes = async (values) => {
    await Auth.updateUserAttributes(
      await Auth.currentAuthenticatedUser(),
      values
    );

    return this.setAuthenticatedUser({
      // required because Auth.updateUserAttributes doesn't update the cache...
      // https://github.com/aws-amplify/amplify-js/issues/2534
      bypassCache: true,
    });
  };

  render() {
    const { children, homePath, loginPath } = this.props;
    const { authState, authUser, jwt } = this.state;

    return (
      <AuthContext.Provider
        value={{
          completeNewPasswordChallenge: this.completeNewPasswordChallenge,
          federatedSignIn: this.setFederatedSignIn,
          homePath,
          isAuthenticated: authState === AUTH_STATES.SIGNED_IN,
          isLoading: authState === AUTH_STATES.LOADING,
          jwt,
          loginPath,
          newPasswordRequired: authState === AUTH_STATES.NEW_PASSWORD_REQUIRED,
          signIn: this.signIn,
          signOut: this.signOut,
          signUp: this.signUp,
          updateUserAttributes: this.updateUserAttributes,
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
