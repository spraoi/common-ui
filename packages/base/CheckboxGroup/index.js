import PropTypes from 'prop-types';
import React from 'react';
import { Field } from 'react-final-form';
import Box from '../Box';
import Radio from '../Checkbox';

const CheckboxGroup = ({ inline, label, name, options, type, ...rest }) => (
  <>
    {label && (
      <Box color="text.subtle" mr={5} mt={5}>
        {label}
      </Box>
    )}
    <Box display={inline ? 'flex' : 'block'}>
      {options.map(({ label, value }) => (
        <Box key={value} mr={inline ? 6 : null} mt={inline ? null : 3}>
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

CheckboxGroup.propTypes = {
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

CheckboxGroup.defaultProps = {
  inline: false,
  label: null,
  type: 'radio',
};

export default CheckboxGroup;
