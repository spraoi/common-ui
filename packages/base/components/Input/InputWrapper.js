import PropTypes from 'prop-types';
import React from 'react';
import styled, { css } from 'styled-components';

const Error = styled.span`
  display: block;
  margin-top: ${p => p.theme.space.xxxs};
  color: ${p => p.theme.colors.error};
  font-size: ${p => p.theme.fontSizes.sm};
`;

const Label = styled.label`
  display: block;
  margin-bottom: ${p => p.theme.space.xxxs};
  color: ${p => p.theme.colors.textSubtle};
  cursor: pointer;

  ${p =>
    p.inline &&
    css`
      margin-bottom: 0;
      padding-left: ${p => p.theme.space.sm};
      color: ${p => p.theme.colors.textPrimary};
    `}
`;

const Subtext = styled.div`
  margin-top: ${p => p.theme.space.xxxs};
  font-size: ${p => p.theme.fontSizes.sm};
`;

const Wrapper = styled.div`
  position: relative;
  margin-top: ${p => p.theme.space.lg};

  &:first-of-type {
    ${p =>
      !p.forceTopMargin &&
      css`
        margin-top: 0;
      `}
  }

  ${p =>
    p.disabled &&
    css`
      opacity: 0.3;
      pointer-events: none;
    `}

  ${p =>
    p.inline &&
    css`
      display: flex;
      flex-direction: row-reverse;
      justify-content: flex-end;
      align-items: center;
      margin-top: 0;
      margin-right: ${p => p.theme.space.lg};
    `}
`;

const InputWrapper = ({
  children,
  forceTopMargin,
  htmlFor,
  inline,
  input,
  label,
  meta,
  subtext,
  ...rest
}) => {
  const error = meta.error && meta.touched ? 1 : 0;
  let below = null;
  if (error) below = <Error>{meta.error}</Error>;
  else if (subtext) below = <Subtext>{subtext}</Subtext>;

  return (
    <Wrapper
      disabled={rest.disabled}
      forceTopMargin={forceTopMargin}
      inline={inline}
    >
      {label && (
        <Label htmlFor={htmlFor || input.name} inline={inline}>
          {label}
        </Label>
      )}
      {children({ error, ...rest })}
      {below}
    </Wrapper>
  );
};

InputWrapper.propTypes = {
  children: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  forceTopMargin: PropTypes.bool,
  htmlFor: PropTypes.string,
  inline: PropTypes.bool,
  input: PropTypes.shape({ name: PropTypes.string.isRequired }).isRequired,
  label: PropTypes.string,
  meta: PropTypes.shape({
    error: PropTypes.string,
    touched: PropTypes.bool.isRequired,
  }).isRequired,
  subtext: PropTypes.node,
};

InputWrapper.defaultProps = {
  disabled: false,
  forceTopMargin: false,
  htmlFor: null,
  inline: false,
  label: null,
  subtext: null,
};

export default InputWrapper;
