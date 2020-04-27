// NOTE: this file is generated automatically, any changes will be overwritten.

import PropTypes from 'prop-types';
import React from 'react';
import Box from '../Box';
import check from '../Dropdown/icons/check.svg';
import outline from '../Dropdown/icons/outline.svg';

const svgMap = {
  check,
  outline,
};

const Icon = ({ svg, ...rest }) => {
  const SvgComponent = svgMap[svg];

  return (
    <Box {...rest}>
      <SvgComponent />
    </Box>
  );
};

Icon.propTypes = {
  svg: PropTypes.string.isRequired,
};

export default Icon;
