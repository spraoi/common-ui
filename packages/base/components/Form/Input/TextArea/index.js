import PropTypes from 'prop-types';
import React from 'react';
import TextareaAutosize from 'react-autosize-textarea';
import styled, { css } from 'styled-components';
import InputWrapper from '../InputWrapper';

const StyledTextArea = styled(TextareaAutosize)`
  display: block;
  width: 100%;
  padding: ${p => p.theme.space[2]} ${p => p.theme.space[2]};
  border: ${p => p.theme.variants.inputs.primary.borderStyle}
    ${p => p.theme.variants.inputs.primary.borderWidth}
    ${p => p.theme.variants.inputs.primary.borderColor};
  border-radius: ${p => p.theme.radii[1]};
  outline: none;
  font-family: ${p => p.theme.fonts.primary};
  font-size: ${p => p.theme.fontSizes[3]};
  resize: vertical;

  &:focus {
    border-color: ${p =>
      p.theme.variants.inputs.primary['&:focus'].borderColor};
  }

  ${p =>
    p.error &&
    css`
      border-color: ${p => p.theme.colors.error};
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
