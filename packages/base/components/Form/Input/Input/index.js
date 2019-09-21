import PropTypes from 'prop-types';
import React from 'react';
import Box from '../../../Box';
import InputWrapper from '../InputWrapper';

const Input = ({ input, ...rest }) => (
  <InputWrapper input={input} {...rest}>
    {props => (
      <Box
        as="input"
        borderColor={input.error ? 'error' : null}
        borderRadius={1}
        id={input.name}
        px={3}
        py={2}
        variant="inputs.primary"
        width="100%"
        {...props}
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
