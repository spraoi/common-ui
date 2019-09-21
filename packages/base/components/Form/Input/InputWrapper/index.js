import PropTypes from 'prop-types';
import React from 'react';
import styled, { css } from 'styled-components';

const Error = styled.span`
  display: block;
  margin-top: ${p => p.theme.space[0]};
  color: ${p => p.theme.colors.error};
  font-size: ${p => p.theme.fontSizes[2]};
`;

const Label = styled.label`
  display: block;
  margin-bottom: ${p => p.theme.space[0]};
  color: ${p => p.theme.colors.text.subtle};
  cursor: pointer;

  ${p =>
    (p.labelPosition === 'left' || p.labelPosition === 'right') &&
    css`
      margin-bottom: 0;
      padding-right: ${p.labelPosition === 'left' ? p.theme.space[3] : '0'};
      padding-left: ${p.labelPosition === 'right' ? p.theme.space[3] : '0'};
    `}
`;

const Subtext = styled.div`
  margin-top: ${p => p.theme.space[0]};
  font-size: ${p => p.theme.fontSizes[2]};
`;

const Wrapper = styled.div`
  position: relative;

  &:first-of-type {
    ${p =>
      !p.forceTopMargin &&
      css`
        margin-top: 0;
      `}
  }

  ${p =>
    !p.noTopMargin &&
    css`
      margin-top: ${p => p.theme.space[5]};
    `}

  ${p =>
    p.disabled &&
    css`
      opacity: 0.3;
      pointer-events: none;
    `}

  ${p =>
    (p.labelPosition === 'left' || p.labelPosition === 'right') &&
    css`
      display: flex;
      flex-direction: ${p.labelPosition === 'left' ? 'row' : 'row-reverse'};
      justify-content: flex-end;
      align-items: center;
      margin-top: 0;
    `}
`;

const InputWrapper = ({
  children,
  forceTopMargin,
  htmlFor,
  input,
  label,
  labelPosition,
  meta,
  noTopMargin,
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
      labelPosition={labelPosition}
      noTopMargin={noTopMargin}
    >
      {label && (
        <Label htmlFor={htmlFor || input.name} labelPosition={labelPosition}>
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
  input: PropTypes.shape({ name: PropTypes.string.isRequired }).isRequired,
  label: PropTypes.string,
  labelPosition: PropTypes.oneOf(['left', 'right', 'top']),
  meta: PropTypes.shape({
    error: PropTypes.string,
    touched: PropTypes.bool.isRequired,
  }).isRequired,
  noTopMargin: PropTypes.bool,
  subtext: PropTypes.node,
};

InputWrapper.defaultProps = {
  disabled: false,
  forceTopMargin: false,
  htmlFor: null,
  label: null,
  labelPosition: 'top',
  noTopMargin: false,
  subtext: null,
};

export default InputWrapper;
