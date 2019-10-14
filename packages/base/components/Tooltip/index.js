import PropTypes from 'prop-types';
import React from 'react';
import ReactTooltip from 'react-tooltip';
import Box from '../Box';

class Tooltip extends React.Component {
  componentDidUpdate() {
    ReactTooltip.rebuild();
  }

  render() {
    const {
      children,
      content,
      id,
      disable,
      maxWidth,
      maxHeight,
      sx,
      ...rest
    } = this.props;

    return (
      <>
        {children && (
          <Box
            data-delay-hide={200}
            data-for={id}
            data-html
            data-tip={content}
            data-tip-disable={disable}
            {...rest}
          >
            {children}
          </Box>
        )}
        <Box
          as={ReactTooltip}
          id={id}
          maxHeight={maxHeight}
          maxWidth={maxWidth}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            ...sx,
          }}
          {...rest}
        />
      </>
    );
  }
}

Tooltip.propTypes = {
  children: PropTypes.node,
  content: PropTypes.node,
  disable: PropTypes.bool,
  id: PropTypes.string,
  maxHeight: PropTypes.string,
  maxWidth: PropTypes.string,
  place: PropTypes.string,
  sx: PropTypes.shape({}),
  type: PropTypes.string,
};

Tooltip.defaultProps = {
  children: null,
  content: '',
  disable: false,
  id: 'graph_tooltip',
  maxHeight: '202px',
  maxWidth: '60ch',
  place: 'top',
  sx: {},
  type: 'dark',
};

export default Tooltip;
