import Amplify, { Auth } from 'aws-amplify';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { objectMapKeysDeep, snakeCaseToCamelCase } from '@spraoi/helpers';
import { Provider } from '../../utilities/context';
import { AUTH_STATES } from './constants';

export default class AuthProvider extends PureComponent {
  static propTypes = {
    amplifyConfig: PropTypes.shape({
      Auth: PropTypes.shape({
        identityPoolId: PropTypes.string.isRequired,
        userPoolId: PropTypes.string.isRequired,
        userPoolWebClientId: PropTypes.string.isRequired,
      }).isRequired,
      Storage: PropTypes.shape({
        bucket: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    children: PropTypes.node.isRequired,
    homePath: PropTypes.string,
    loginPath: PropTypes.string,
  };

  static defaultProps = {
    homePath: '/',
    loginPath: '/login',
  };

  state = {
    authState: AUTH_STATES.LOADING,
    authUser: {},
  };

  async componentDidMount() {
    const { amplifyConfig } = this.props;
    Amplify.configure(amplifyConfig);
    await this.setAuthenticatedUser();
  }

  async setAuthenticatedUser() {
    const user = await Auth.currentUserInfo();

    if (user) {
      const authUser = objectMapKeysDeep(
        { ...user, ...user.attributes },
        snakeCaseToCamelCase
      );

      this.setState({ authState: AUTH_STATES.SIGNED_IN, authUser });
      return authUser;
    }

    this.setState({ authState: AUTH_STATES.SIGNED_OUT, authUser: {} });
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
    this.setState({ authState: AUTH_STATES.SIGNED_OUT, authUser: {} });
  };

  signUp = async values => {
    await Auth.signUp(values);
    return Auth.signIn(values.username, values.password);
  };

  render() {
    const { children, homePath, loginPath } = this.props;
    const { authState, authUser } = this.state;

    return (
      <Provider
        value={{
          completeNewPasswordChallenge: this.completeNewPasswordChallenge,
          homePath,
          isAuthenticated: authState === AUTH_STATES.SIGNED_IN,
          isLoading: authState === AUTH_STATES.LOADING,
          loginPath,
          newPasswordRequired: authState === AUTH_STATES.NEW_PASSWORD_REQUIRED,
          signIn: this.signIn,
          signOut: this.signOut,
          signUp: this.signUp,
          user: authUser,
        }}
      >
        {children}
      </Provider>
    );
  }
}
