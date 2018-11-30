import Amplify, { Auth } from 'aws-amplify';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { objectMapKeysDeep, snakeCaseToCamelCase } from '@spraoi/helpers';
import Context from '../../context';
import { AUTH_STATES } from './constants';

export default class Authenticator extends PureComponent {
  static propTypes = {
    amplifyConfig: PropTypes.shape({}).isRequired,
    page: PropTypes.node.isRequired,
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
    try {
      const { attributes } = await Auth.currentAuthenticatedUser();

      this.setState({
        authState: AUTH_STATES.SIGNED_IN,
        authUser: objectMapKeysDeep(attributes, snakeCaseToCamelCase),
      });
    } catch (e) {
      this.setState({ authState: AUTH_STATES.SIGNED_OUT, authUser: {} });
    }
  }

  signIn = async values => {
    await Auth.signIn(values.username, values.password);
    await this.setAuthenticatedUser();
  };

  signOut = async () => {
    await Auth.signOut();
    this.setState({ authState: AUTH_STATES.SIGNED_OUT });
  };

  signUp = async values => {
    await Auth.signUp(values);
    await Auth.signIn(values.username, values.password);
  };

  render() {
    const { page } = this.props;
    const { authState, authUser } = this.state;

    return (
      <Context.Provider
        value={{
          isAuthenticated: authState === AUTH_STATES.SIGNED_IN,
          isLoading: authState === AUTH_STATES.LOADING,
          signIn: this.signIn,
          signOut: this.signOut,
          signUp: this.signUp,
          user: authUser,
        }}
      >
        {page}
      </Context.Provider>
    );
  }
}
