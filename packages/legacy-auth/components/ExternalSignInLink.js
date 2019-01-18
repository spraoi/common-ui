import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signInExternal } from '../actions';

@connect(
  null,
  {
    signInExternal,
  }
)
export default class ExternalSignInLink extends PureComponent {
  static propTypes = {
    provider: PropTypes.oneOf(['Facebook', 'Google']),
    className: PropTypes.string,
  };

  render() {
    const { children, className, provider, signInExternal } = this.props;

    return (
      <button
        className={className}
        onClick={() => signInExternal(provider)}
        type="button"
      >
        {children}
      </button>
    );
  }
}
