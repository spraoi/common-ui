import React from 'react';
import PropTypes from 'prop-types';
import { components } from 'react-select';
import Box from '../../Box';

const Option = (props) => {
  const { isSelected, label, selectProps } = props;
  const { checkIcon, uncheckIcon } = selectProps;

  return (
    <components.Option {...props}>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'row',
          verticalAlign: 'middle',
        }}
      >
        {checkIcon && uncheckIcon && (
          <Box mr={2}>{isSelected ? checkIcon : uncheckIcon}</Box>
        )}
        <Box>{label}</Box>
      </Box>
    </components.Option>
  );
};

Option.propTypes = {
  isSelected: PropTypes.bool.isRequired,
  label: PropTypes.node.isRequired,
  selectProps: PropTypes.shape({
    checkIcon: PropTypes.node.isRequired,
    uncheckIcon: PropTypes.node.isRequired,
  }).isRequired,
};

export default Option;
