import Amplify, { Auth } from 'aws-amplify';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { objectMapKeysDeep, snakeCaseToCamelCase } from '@spraoi/helpers';
import Context from '../../context';
import { AUTH_STATES } from './constants';

export default class AuthProvider extends PureComponent {
  static propTypes = {
    amplifyConfig: PropTypes.shape({}).isRequired,
    children: PropTypes.node.isRequired,
  };

  state = {
    authState: AUTH_STATES.LOADING,
    authUser: {},
  };

  async componentWillMount() {
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
    const { children } = this.props;
    const { authState, authUser } = this.state;

    return (
      <Context.Provider
        value={{
          completeNewPasswordChallenge: this.completeNewPasswordChallenge,
          isAuthenticated: authState === AUTH_STATES.SIGNED_IN,
          isLoading: authState === AUTH_STATES.LOADING,
          newPasswordRequired: authState === AUTH_STATES.NEW_PASSWORD_REQUIRED,
          signIn: this.signIn,
          signOut: this.signOut,
          signUp: this.signUp,
          user: authUser,
        }}
      >
        {children}
      </Context.Provider>
    );
  }
}
