import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Route from './Route';

@connect(state => ({
  isAuthenticated: state.auth.isAuthenticated,
}))
export default class PrivateRoute extends PureComponent {
  render() {
    const { isAuthenticated, redirect, ...rest } = this.props;
    return <Route {...rest} redirect={!isAuthenticated ? redirect : null} />;
  }
}
