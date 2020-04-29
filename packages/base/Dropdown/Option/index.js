import React from 'react';
import PropTypes from 'prop-types';
import { components } from 'react-select';
import Box from '../../Box';

const Option = (mainProps) => {
  const { isSelected, label, selectProps } = mainProps;
  const { checkIcon, uncheckIcon } = selectProps;
  if (isSelected) {
    return (
      <components.Option {...mainProps}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            verticalAlign: 'middle',
          }}
        >
          <Box mr={2}>{checkIcon}</Box>
          <Box>{label}</Box>
        </Box>
      </components.Option>
    );
  }
  return (
    <components.Option {...mainProps}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          verticalAlign: 'middle',
        }}
      >
        <Box mr={2}>{uncheckIcon}</Box>
        <Box>{label}</Box>
      </Box>
    </components.Option>
  );
};

Option.propTypes = {
  mainProps: PropTypes.shape({}).isRequired,
};

export default Option;
