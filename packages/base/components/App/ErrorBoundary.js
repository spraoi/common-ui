import PropTypes from 'prop-types';
import React from 'react';
import Box from '../Box';

class ErrorBoundary extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  state = { error: null, errorInfo: null };

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
  }

  render() {
    const { children } = this.props;
    const { error, errorInfo } = this.state;

    if (errorInfo) {
      return (
        <Box p="lg">
          <h1>Something went wrong.</h1>
          <details>
            <Box as="pre" color="error" pt="md">
              {error && error.toString()}
              {errorInfo.componentStack}
            </Box>
          </details>
        </Box>
      );
    }

    return children;
  }
}

export default ErrorBoundary;