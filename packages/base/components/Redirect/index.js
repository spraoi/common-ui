import PropTypes from 'prop-types';
import React from 'react';
import { navigate } from 'gatsby';

export default class Redirect extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    state: PropTypes.object,
    to: PropTypes.string.isRequired,
    when: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    state: {},
  };

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
