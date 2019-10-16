import PropTypes from 'prop-types';

export const pageTypes = {
  children: PropTypes.node.isRequired,
  isPrivate: PropTypes.bool,
  isPublic: PropTypes.bool,
  redirect: PropTypes.string,
  renderLoading: PropTypes.node,
  waitForAuth: PropTypes.bool,
};

export const pageHandlerTypes = {
  ...pageTypes,
  homePath: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired })
    .isRequired,
  loginPath: PropTypes.string.isRequired,
};
