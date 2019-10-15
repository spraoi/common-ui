import PropTypes from 'prop-types';
import React from 'react';
import ReactTooltip from 'react-tooltip';
import Box from '../Box';

class Tooltip extends React.Component {
  componentDidUpdate() {
    ReactTooltip.rebuild();
  }

  render() {
    const { children, content, id, sx, ...rest } = this.props;

    return (
      <>
        {children && content && (
          <Box data-for={id} data-html data-tip={content} {...rest}>
            {children}
          </Box>
        )}
        <Box
          as={ReactTooltip}
          id={id}
          sx={{ display: 'flex', flexDirection: 'column', ...sx }}
          {...rest}
        />
      </>
    );
  }
}

Tooltip.propTypes = {
  children: PropTypes.node,
  content: PropTypes.node,
  id: PropTypes.string.isRequired,
  maxHeight: PropTypes.string,
  maxWidth: PropTypes.string,
  sx: PropTypes.shape({}),
};

Tooltip.defaultProps = {
  children: null,
  content: null,
  maxHeight: '200px',
  maxWidth: '60ch',
  sx: {},
};

export default Tooltip;
