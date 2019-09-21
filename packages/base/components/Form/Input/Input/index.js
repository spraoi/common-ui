import PropTypes from 'prop-types';
import React from 'react';
import Box from '../../../Box';
import InputWrapper from '../InputWrapper';

const Input = ({ input, ...rest }) => (
  <InputWrapper input={input} {...rest}>
    {({ error, ...inputRest }) => (
      <Box
        as="input"
        id={input.name}
        sx={{ borderColor: error ? 'error' : null }}
        variant="inputs.primary"
        width="100%"
        {...inputRest}
        {...input}
      />
    )}
  </InputWrapper>
);

Input.propTypes = {
  input: PropTypes.shape({ error: PropTypes.bool, name: PropTypes.string })
    .isRequired,
};

export default Input;
