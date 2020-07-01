import PropTypes from 'prop-types';
import React from 'react';
import Box from '../Box';
import InputWrapper from '../InputWrapper';

const Checkbox = ({ input, label, labelSx, type, ...rest }) => (
  <InputWrapper
    htmlFor={input.name}
    input={input}
    label={label}
    labelSx={{ m: 0, ml: 4, order: 2, ...labelSx }}
    {...rest}
  >
    {(props) => (
      <Box as="input" id={input.name} type={type} {...props} {...input} />
    )}
  </InputWrapper>
);

Checkbox.propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.string,
  }).isRequired,
  label: PropTypes.string.isRequired,
  labelSx: PropTypes.shape({}),
  type: PropTypes.oneOf(['checkbox', 'radio']),
};

Checkbox.defaultProps = {
  labelSx: {},
  type: 'checkbox',
};

export default Checkbox;
