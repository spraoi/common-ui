import PropTypes from 'prop-types';
import React from 'react';
import Box from '../Box';

const Card = ({ sx, ...rest }) => (
  <Box
    sx={{
      bg: 'white',
      borderRadius: 2,
      boxShadow: 1,
      mt: 5,
      p: 6,
      position: 'relative',
      ...sx,
    }}
    {...rest}
  />
);

Card.propTypes = {
  sx: PropTypes.shape({}),
};

Card.defaultProps = {
  sx: {},
};

export default Card;
