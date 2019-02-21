import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import InputWrapper from './InputWrapper';

const StyledTextArea = styled.textarea`
  display: block;
  width: 100%;
  padding: ${p => p.theme.space.xs} ${p => p.theme.space.sm};
  border: solid 1px ${p => p.theme.colors.inputPrimaryBorder};
  border-radius: ${p => p.theme.radii.md};
  outline: none;
  font-size: ${p => p.theme.fontSizes.md};
`;

const TextArea = ({ input, ...rest }) => (
  <InputWrapper input={input} {...rest}>
    {props => <StyledTextArea id={input.name} {...props} {...input} />}
  </InputWrapper>
);

TextArea.propTypes = {
  input: PropTypes.shape({ name: PropTypes.string.isRequired }).isRequired,
};

export default TextArea;
