import PropTypes from 'prop-types';
import React from 'react';
import Box from '@spraoi/base/Box';

const SingleHorizontalBarChart = ({ value, sx, ...rest }) => (
  <Box
    sx={{ bg: 'grays.2', borderRadius: 0, height: '1.25rem', ...sx }}
    {...rest}
  >
    <Box
      sx={{
        bg: 'visualizations.0',
        borderRadius: 0,
        height: '100%',
        width: `${value * 100}%`,
      }}
    />
  </Box>
);

SingleHorizontalBarChart.propTypes = {
  sx: PropTypes.shape({}),
  value: PropTypes.number.isRequired,
};

SingleHorizontalBarChart.defaultProps = {
  sx: {},
};

export default SingleHorizontalBarChart;
