import PropTypes from 'prop-types';
import React from 'react';
import TextareaAutosize from 'react-autosize-textarea';
import styled, { css } from 'styled-components';
import InputWrapper from './InputWrapper';

const StyledTextArea = styled(TextareaAutosize)`
  display: block;
  width: 100%;
  padding: ${p => p.theme.space.xs} ${p => p.theme.space.xs};
  border: solid 1px ${p => p.theme.colors.inputPrimaryBorder};
  border-radius: ${p => p.theme.radii.md};
  outline: none;
  font-family: ${p => p.theme.fonts.primary};
  font-size: ${p => p.theme.fontSizes.md};
  resize: vertical;

  &:focus {
    border-color: ${p => p.theme.colors.inputPrimaryBorderFocus};
  }

  ${p =>
    p.error &&
    css`
      border-color: ${p => p.theme.colors.inputPrimaryBorderError};
    `}
`;

const TextArea = ({ input, ...rest }) => (
  <InputWrapper input={input} {...rest}>
    {props => <StyledTextArea async id={input.name} {...props} {...input} />}
  </InputWrapper>
);

TextArea.propTypes = {
  input: PropTypes.shape({ name: PropTypes.string.isRequired }).isRequired,
};

export default TextArea;