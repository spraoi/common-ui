import PropTypes from 'prop-types';
import React from 'react';
import { Field } from 'react-final-form';
import Box from '../Box';
import Radio from './Radio';

const RadioGroup = ({ inline, label, name, options, ...rest }) => (
  <>
    <Box color="textSubtle" mr="lg" mt="lg">
      {label}
    </Box>
    <Box display={inline ? 'flex' : 'block'}>
      {options.map(({ label, value }) => (
        <Box key={value} mt="sm">
          <Field
            component={Radio}
            label={label}
            name={name}
            type="radio"
            value={value}
            {...rest}
          />
        </Box>
      ))}
    </Box>
  </>
);

RadioGroup.propTypes = {
  inline: PropTypes.bool,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
};

RadioGroup.defaultProps = {
  inline: false,
};

export default RadioGroup;
