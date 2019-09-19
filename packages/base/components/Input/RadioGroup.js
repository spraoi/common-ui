import PropTypes from 'prop-types';
import React from 'react';
import { Field } from 'react-final-form';
import Box from '../Box';
import Radio from './Radio';

const RadioGroup = ({ inline, label, name, options, type, ...rest }) => (
  <>
    {label && (
      <Box color="textSubtle" mr="lg" mt="lg">
        {label}
      </Box>
    )}
    <Box display={inline ? 'flex' : 'block'}>
      {options.map(({ label, value }) => (
        <Box key={value} mr={inline ? 'xl' : '0'} mt={inline ? '0' : 'sm'}>
          <Field
            component={Radio}
            label={label}
            name={name}
            type={type}
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
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  type: PropTypes.oneOf(['checkbox', 'radio']),
};

RadioGroup.defaultProps = {
  inline: false,
  label: null,
  type: 'radio',
};

export default RadioGroup;
