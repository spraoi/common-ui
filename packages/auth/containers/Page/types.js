import PropTypes from 'prop-types';

export const pageTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired,
  isPrivate: PropTypes.bool,
  isPublic: PropTypes.bool,
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired })
    .isRequired,
  navigate: PropTypes.func.isRequired,
  redirect: PropTypes.string,
  renderLoading: PropTypes.node,
  waitForAuth: PropTypes.bool,
};

export const pageHandlerTypes = {
  ...pageTypes,
  isAuthenticated: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
