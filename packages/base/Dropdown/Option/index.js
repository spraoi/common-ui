import React from 'react';
import PropTypes from 'prop-types';
import { components } from 'react-select';
import Box from '../../Box';
import Icon from '../../Icon';

const Option = (mainProps) => {
  const { isSelected, label } = mainProps;
  if (isSelected) {
    return (
      <components.Option {...mainProps}>
        <Box
          sx={{
            display: 'flex',
            verticalAlign: 'middle',
          }}
        >
          <Icon
            height="1rem"
            mr={2}
            svg="check"
            sx={{
              '&:hover': { fill: 'accent' },
              fill: 'accent',
              transition: 'fill 0.2s',
            }}
            width="1rem"
          />
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
          verticalAlign: 'middle',
        }}
      >
        <Icon
          height="1rem"
          mr={2}
          svg="outline"
          sx={{
            '&:hover': { fill: 'accentDark' },
            fill: 'accent',
            transition: 'fill 0.2s',
          }}
          width="1rem"
        />
        <Box>{label}</Box>
      </Box>
    </components.Option>
  );
};

Option.propTypes = {
  mainProps: PropTypes.shape({}).isRequired,
};

export default Option;
