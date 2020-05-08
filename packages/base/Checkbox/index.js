import PropTypes from 'prop-types';
import React from 'react';
import Box from '../Box';
import InputWrapper from '../InputWrapper';

const Checkbox = ({ input, label, type, ...rest }) => (
  <InputWrapper
    htmlFor={`${input.name}${input.value}`}
    input={input}
    label={label}
    {...rest}
  >
    {(props) => (
      <Box
        as="input"
        id={`${input.name}${input.value}`}
        type={type}
        {...props}
        {...input}
      />
    )}
  </InputWrapper>
);

Checkbox.propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.string,
  }).isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['checkbox', 'radio']),
};

Checkbox.defaultProps = {
  type: 'checkbox',
};

export default Checkbox;
