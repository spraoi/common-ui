import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Auth } from 'aws-amplify';
import Context from '../Context';
import { AUTH_STATES } from './constants';

export default class AuthHandler extends PureComponent {
  static propTypes = {
    authData: PropTypes.shape({ username: PropTypes.string }),
    authState: PropTypes.oneOf(Object.values(AUTH_STATES)),
    onStateChange: PropTypes.func,
    page: PropTypes.node.isRequired,
  };

  static defaultProps = {
    authData: {},
    authState: AUTH_STATES.LOADING,
    onStateChange: null,
  };

  signIn = async values => {
    const { onStateChange } = this.props;
    await Auth.signIn(values.username, values.password);
    onStateChange(AUTH_STATES.SIGNED_IN);
  };

  signOut = async () => {
    const { onStateChange } = this.props;
    await Auth.signOut();
    onStateChange(AUTH_STATES.SIGN_IN);
  };

  signUp = async values => {
    await Auth.signUp(values);
    await Auth.signIn(values.username, values.password);
  };

  render() {
    const { authState, page } = this.props;

    return (
      <Context.Provider
        value={{
          isAuthenticated: authState === AUTH_STATES.SIGNED_IN,
          isLoading: authState === AUTH_STATES.LOADING,
          signIn: this.signIn,
          signOut: this.signOut,
          signUp: this.signUp,
        }}
      >
        {page}
      </Context.Provider>
    );
  }
}
