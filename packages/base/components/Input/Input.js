import PropTypes from 'prop-types';
import React from 'react';
import styled, { css } from 'styled-components';
import InputWrapper from './InputWrapper';

const StyledInput = styled.input`
  width: 100%;
  padding: ${p => p.theme.space.xs} ${p => p.theme.space.sm};
  border: solid 1px ${p => p.theme.colors.inputPrimaryBorder};
  border-radius: ${p => p.theme.radii.md};
  outline: none;

  &:focus {
    border-color: ${p => p.theme.colors.inputPrimaryBorderFocus};
  }

  ${p =>
    p.error &&
    css`
      border-color: ${p => p.theme.colors.inputPrimaryBorderError};
    `}
`;

const Input = ({ input, ...rest }) => (
  <InputWrapper input={input} {...rest}>
    {props => <StyledInput id={input.name} {...props} {...input} />}
  </InputWrapper>
);

Input.propTypes = {
  input: PropTypes.shape({ name: PropTypes.string.isRequired }).isRequired,
};

export default Input;
