import React from 'react';
import PropTypes from 'prop-types';
import Box from '../Box';

const Badge = ({ children, sx, ...rest }) => {
  return (
    <Box
      sx={{
        bg: 'primary',
        borderRadius: 9999,
        color: 'white',
        display: 'inline-block',
        px: 2,
        py: 1,
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  sx: PropTypes.shape({}),
};

Badge.defaultProps = {
  sx: {},
};

export default Badge;
