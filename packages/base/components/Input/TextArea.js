import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import InputWrapper from './InputWrapper';

const Input = styled.textarea`
  width: 100%;
  padding: ${p => p.theme.space.xs} ${p => p.theme.space.sm};
  border: solid 1px ${p => p.theme.colors.inputPrimaryBorder};
  border-radius: ${p => p.theme.radii.md};
  outline: none;
`;

const TextArea = ({ input, placeholder, ...rest }) => (
  <InputWrapper input={input} {...rest}>
    <Input id={input.name} placeholder={placeholder} {...input} />
  </InputWrapper>
);

TextArea.propTypes = {
  input: PropTypes.shape({ name: PropTypes.string.isRequired }).isRequired,
  placeholder: PropTypes.string,
};

TextArea.defaultProps = {
  placeholder: '',
};

export default TextArea;
