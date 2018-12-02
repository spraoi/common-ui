import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import InputWrapper from './InputWrapper';

const Input = styled.input`
  width: 100%;
  padding: ${p => p.theme.space.xxs} ${p => p.theme.space.xs};
  border: solid 1px ${p => p.theme.colors.backgroundLighter};
  border-radius: ${p => p.theme.radii.md};
  outline: none;
`;

const InputText = ({ input, placeholder, type, ...rest }) => (
  <InputWrapper input={input} {...rest}>
    <Input id={input.name} placeholder={placeholder} type={type} {...input} />
  </InputWrapper>
);

InputText.propTypes = {
  input: PropTypes.shape({ name: PropTypes.string.isRequired }).isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
};

InputText.defaultProps = {
  placeholder: '',
  type: 'text',
};

export default InputText;
