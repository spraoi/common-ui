import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const Error = styled.span`
  display: block;
  color: ${p => p.theme.colors.error};
  font-size: ${p => p.theme.fontSizes.sm};
`;

const Label = styled.label`
  display: block;
`;

const Subtext = styled.div`
  font-size: ${p => p.theme.fontSizes.sm};
`;

const Wrapper = styled.div`
  position: relative;
  margin-top: ${p => p.theme.space.md};

  &:first-of-type {
    margin-top: 0;
  }
`;

const InputWrapper = ({ children, input, label, meta, subtext, ...rest }) => {
  let below = null;
  if (meta.error && meta.touched) below = <Error>{meta.error}</Error>;
  else if (subtext) below = <Subtext>{subtext}</Subtext>;

  return (
    <Wrapper>
      {label && <Label htmlFor={input.name}>{label}</Label>}
      {children(rest)}
      {below}
    </Wrapper>
  );
};

InputWrapper.propTypes = {
  children: PropTypes.func.isRequired,
  input: PropTypes.shape({ name: PropTypes.string.isRequired }).isRequired,
  label: PropTypes.string,
  meta: PropTypes.shape({
    error: PropTypes.string,
    touched: PropTypes.bool.isRequired,
  }).isRequired,
  subtext: PropTypes.node,
};

InputWrapper.defaultProps = {
  label: null,
  subtext: null,
};

export default InputWrapper;
