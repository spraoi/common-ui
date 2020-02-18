import PropTypes from 'prop-types';
import React from 'react';
import Box from '../Box';
import InputWrapper from '../InputWrapper';

const Checkbox = ({ input, label, labelReverse, type, ...rest }) => (
  <InputWrapper
    htmlFor={`${input.name}${input.value}`}
    input={input}
    label={label}
    {...rest}
  >
    {props => (
      <Box
        as="input"
        id={`${input.name}${input.value}`}
        type={type}
        {...props}
        {...input}
        sx={{
          order: labelReverse ? '' : '-1',
        }}
      />
    )}
  </InputWrapper>
);

Checkbox.propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }).isRequired,
  label: PropTypes.string.isRequired,
  labelReverse: PropTypes.bool,
  type: PropTypes.oneOf(['checkbox', 'radio']),
};

Checkbox.defaultProps = {
  labelReverse: false,
  type: 'checkbox',
};

export default Checkbox;
