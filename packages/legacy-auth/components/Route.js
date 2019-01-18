import React, { PureComponent } from 'react';
import { Route, Redirect } from 'react-router-dom';
import ReactGA from 'react-ga';
import PropTypes from 'prop-types';

export default class PrivateRoute extends PureComponent {
  static propTypes = {
    component: PropTypes.func,
    redirect: PropTypes.string,
  };

  render() {
    const { component: C, redirect, ...rest } = this.props;
    if (redirect) return <Redirect to={redirect} />;

    if (SPRAOI_ENV.GOOGLE_ANALYTICS) {
      ReactGA.pageview(window.location.pathname + window.location.search);
    }

    return <Route render={props => <C {...props} />} {...rest} />;
  }
}
