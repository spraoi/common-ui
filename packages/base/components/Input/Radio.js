import PropTypes from 'prop-types';
import React from 'react';
import InputWrapper from './InputWrapper';

const Radio = ({ input, label, type, ...rest }) => (
  <InputWrapper
    htmlFor={`${input.name}${input.value}`}
    input={input}
    label={label}
    {...rest}
  >
    {props => (
      <input
        id={`${input.name}${input.value}`}
        type={type}
        {...props}
        {...input}
      />
    )}
  </InputWrapper>
);

Radio.propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }).isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
};

Radio.defaultProps = {
  type: 'radio',
};

export default Radio;
