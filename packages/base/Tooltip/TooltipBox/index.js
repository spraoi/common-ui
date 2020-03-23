import PropTypes from 'prop-types';
import React from 'react';
import ReactTooltip from 'react-tooltip';
import Box from '../../Box';

class TooltipBox extends React.Component {
  componentDidUpdate() {
    ReactTooltip.rebuild();
  }

  render() {
    const {
      id,
      tooltipProps: { sx: tooltipSx, ...tooltipProps },
    } = this.props;

    return (
      <Box
        as={ReactTooltip}
        id={id}
        sx={{
          bg: (p) => `${p.colors.primary}!important`,
          borderRadius: (p) => `${p.radii[1]}!important`,
          maxHeight: '10rem',
          maxWidth: '50ch',
          opacity: '1!important',
          p: 4,
          ...(tooltipSx || {}),
        }}
        {...tooltipProps}
      />
    );
  }
}

TooltipBox.propTypes = {
  id: PropTypes.string.isRequired,
  tooltipProps: PropTypes.shape({ sx: PropTypes.shape({}) }),
};

TooltipBox.defaultProps = {
  tooltipProps: {},
};

export default TooltipBox;
