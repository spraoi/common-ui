import { PureComponent } from 'react';
import { navigate } from 'gatsby';
import { pageHandlerTypes } from './types';

export default class PageHandler extends PureComponent {
  static propTypes = pageHandlerTypes;

  static defaultProps = {
    isPrivate: false,
    isPublic: false,
    redirect: null,
    renderLoading: null,
    waitForAuth: true,
  };

  componentDidMount() {
    this.handleRedirect();
  }

  componentDidUpdate() {
    this.handleRedirect();
  }

  handleRedirect() {
    const {
      homePath,
      isAuthenticated,
      isLoading,
      isPrivate,
      isPublic,
      location,
      loginPath,
      redirect,
    } = this.props;

    if (isPublic && !isLoading && isAuthenticated) {
      return navigate(redirect || homePath);
    }

    if (isPrivate && !isLoading && !isAuthenticated) {
      const defaultRedirect = `${loginPath}?redirect=${location.pathname}`;
      return navigate(redirect || defaultRedirect);
    }
  }

  render() {
    const {
      children,
      isAuthenticated,
      isLoading,
      isPrivate,
      isPublic,
      renderLoading,
      waitForAuth,
    } = this.props;

    if (
      (waitForAuth && isLoading) ||
      (isPrivate && !isAuthenticated) ||
      (isPublic && isAuthenticated) ||
      typeof window === 'undefined'
    ) {
      return renderLoading;
    }

    return children;
  }
}
