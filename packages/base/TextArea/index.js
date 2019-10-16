import PropTypes from 'prop-types';
import React from 'react';
import TextareaAutosize from 'react-autosize-textarea';
import Box from '../Box';
import InputWrapper from '../InputWrapper';

const TextArea = ({ input, ...rest }) => (
  <InputWrapper input={input} {...rest}>
    {({ error, ...inputRest }) => (
      <Box
        as={TextareaAutosize}
        async
        sx={{ borderColor: error ? 'error' : null }}
        variant="inputs.primary"
        width="100%"
        {...inputRest}
        {...input}
      />
    )}
  </InputWrapper>
);

TextArea.propTypes = {
  input: PropTypes.shape({ name: PropTypes.string.isRequired }).isRequired,
};

export default TextArea;
