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
      id,
      tooltipProps: { sx: tooltipSx, ...tooltipProps },
      ...rest
    } = this.props;

    return (
      <>
        {children && (
          <Box data-for={id} data-html {...rest}>
            {children}
          </Box>
        )}
        <Box
          as={ReactTooltip}
          id={id}
          sx={{
            bg: p => `${p.colors.primary}!important`,
            borderRadius: p => `${p.radii[1]}!important`,
            maxHeight: '10rem',
            maxWidth: '50ch',
            opacity: '1!important',
            p: 4,
            ...(tooltipSx || {}),
          }}
          {...tooltipProps}
        />
      </>
    );
  }
}

Tooltip.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string.isRequired,
  tooltipProps: PropTypes.shape({ sx: PropTypes.shape({}) }),
};

Tooltip.defaultProps = {
  children: null,
  tooltipProps: {},
};

export default Tooltip;
