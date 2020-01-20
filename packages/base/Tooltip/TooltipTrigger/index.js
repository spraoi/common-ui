import PropTypes from 'prop-types';
import React from 'react';
import Box from '../../Box';

const TooltipTrigger = ({ children, id, ...rest }) => (
  <>
    {children && (
      <Box data-for={id} data-html {...rest}>
        {children}
      </Box>
    )}
  </>
);

TooltipTrigger.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string.isRequired,
};

TooltipTrigger.defaultProps = {
  children: null,
};

export default TooltipTrigger;
