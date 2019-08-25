import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class SessionsHandler extends PureComponent {
  componentDidMount() {
    this.props.startPollingSessions({ interval: this.props.refreshRate });
  }

  componentWillUnmount() {
    this.props.stopPollingSessions();
  }

  render() {
    return this.props.children;
  }
}

SessionsHandler.propTypes = {
  refreshRate: PropTypes.number.isRequired,
};
