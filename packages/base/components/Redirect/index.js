import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { navigate } from 'gatsby';

export default class Redirect extends PureComponent {
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

  componentWillMount() {
    const { state, to, when } = this.props;
    Redirect.handleRedirect(to, state, when);
  }

  componentWillUpdate({ state, to, when }) {
    Redirect.handleRedirect(to, state, when);
  }

  render() {
    return null;
  }
}
