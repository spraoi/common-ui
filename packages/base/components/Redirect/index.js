import PropTypes from 'prop-types';
import React from 'react';
import { navigate } from 'gatsby';

class Redirect extends React.Component {
  static handleRedirect(to, state, when) {
    if (when) navigate(to, state);
  }

  componentDidMount() {
    const { state, to, when } = this.props;
    Redirect.handleRedirect(to, state, when);
  }

  componentDidUpdate({ state, to, when }) {
    Redirect.handleRedirect(to, state, when);
  }

  render() {
    return null;
  }
}

Redirect.propTypes = {
  state: PropTypes.shape({}),
  to: PropTypes.string.isRequired,
  when: PropTypes.bool.isRequired,
};

Redirect.defaultProps = {
  state: {},
};

export default Redirect;
