import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import isFunction from 'lodash/isFunction';
import { navigate } from 'gatsby';
import { Spinner } from '@spraoi/base';

export default class PageHandler extends PureComponent {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    location: PropTypes.shape({ pathname: PropTypes.string.isRequired })
      .isRequired,
    privateRoute: PropTypes.bool,
    publicRoute: PropTypes.bool,
    redirect: PropTypes.string,
    waitForAuth: PropTypes.bool,
  };

  static defaultProps = {
    privateRoute: false,
    publicRoute: false,
    redirect: null,
    waitForAuth: true,
  };

  componentDidUpdate() {
    const {
      isAuthenticated,
      isLoading,
      location,
      privateRoute,
      publicRoute,
      redirect,
    } = this.props;

    if (publicRoute && !isLoading && isAuthenticated) {
      return navigate(redirect || '/');
    }

    if (privateRoute && !isLoading && !isAuthenticated) {
      const defaultRedirect = `/login?redirect=${location.pathname}`;
      return navigate(redirect || defaultRedirect);
    }

    return null;
  }

  render() {
    const { children, isLoading, waitForAuth } = this.props;

    if ((waitForAuth && isLoading) || typeof window === 'undefined') {
      return <Spinner />;
    }

    return isFunction(children) ? children() : children;
  }
}
