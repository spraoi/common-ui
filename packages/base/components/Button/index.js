import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';
import { BarLoader } from 'react-spinners';
import { Link } from 'gatsby';
import { blacklistProps } from '@spraoi/helpers';
import Box, { boxProps } from '../Box';

const blacklist = [
  ...boxProps,
  'disabled',
  'secondary',
  'simple',
  'submitting',
];

const buttonStyles = css`
  ${p =>
    !p.simple &&
    css`
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: ${p => p.theme.colors.primary};
      border-radius: ${p => p.theme.radii.md};
      box-shadow: ${p => p.theme.boxShadows.md};
      transition: background-color ${p => p.theme.transitionSpeeds.normal};
      color: ${p => p.theme.colors.white};
      font-size: ${p => p.theme.fontSizes.sm};
      font-weight: ${p => p.theme.fontWeights.bold};
      letter-spacing: ${p => p.theme.letterSpacings.sm};
      text-transform: uppercase;
      text-decoration: none;
      white-space: nowrap;
      cursor: pointer;

      &:hover {
        background-color: ${p => p.theme.colors.primaryLight};
      }

      ${p =>
        p.secondary &&
        css`
          background-color: ${p => p.theme.colors.accent};

          &:hover {
            background-color: ${p => p.theme.colors.accentLight};
          }
        `}

      ${p =>
        p.disabled &&
        css`
          opacity: 0.3;
          pointer-events: none;
        `}
    `}
`;

const StyledButton = styled(blacklistProps({ as: 'button', blacklist }))`
  ${buttonStyles};
`;

const StyledLink = styled(blacklistProps({ as: Link, blacklist }))`
  ${buttonStyles};
`;

const StyledChildren = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${p => p.theme.lineHeights.md};
`;

export default class Button extends PureComponent {
  static types = {
    button: 'button',
    submit: 'submit',
  };

  static propTypes = {
    children: PropTypes.node.isRequired,
    disabled: PropTypes.bool,
    download: PropTypes.bool,
    link: PropTypes.string,
    renderLoading: PropTypes.node,
    simple: PropTypes.bool,
    submitting: PropTypes.bool,
    type: PropTypes.oneOf([Button.types.button, Button.types.submit]),
  };

  static defaultProps = {
    disabled: false,
    download: false,
    link: null,
    renderLoading: <BarLoader color="white" />,
    simple: false,
    submitting: false,
    type: Button.types.button,
  };

  static getCommonButtonProps(props, disabled) {
    return {
      color: props.simple ? 'accent' : 'inherit',
      disabled,
      px: props.simple ? '0' : 'md',
      py: props.simple ? '0' : 'sm',
      textDecoration: props.simple ? 'underline' : 'none',
      width: props.simple ? 'auto' : 'inherit',
      ...props,
    };
  }

  renderButton() {
    const {
      children,
      disabled,
      renderLoading,
      submitting,
      type,
      ...rest
    } = this.props;

    let buttonChildren = children;

    if (!rest.simple) {
      buttonChildren = submitting ? (
        <StyledChildren>{renderLoading}</StyledChildren>
      ) : (
        <StyledChildren>{children}</StyledChildren>
      );
    }

    const commonProps = Button.getCommonButtonProps(
      rest,
      disabled || submitting
    );

    return type === Button.types.button ? (
      <Box as={StyledButton} type="button" {...commonProps}>
        {buttonChildren}
      </Box>
    ) : (
      <Box as={StyledButton} type="submit" {...commonProps}>
        {buttonChildren}
      </Box>
    );
  }

  renderLink() {
    const { children, disabled, download, link, ...rest } = this.props;
    delete rest.renderLoading;
    const commonProps = Button.getCommonButtonProps(rest, disabled);

    return download ? (
      <Box as={StyledLink} download href={link} {...commonProps}>
        {children}
      </Box>
    ) : (
      <Box as={StyledLink} disabled={disabled} to={link} {...commonProps}>
        {children}
      </Box>
    );
  }

  render() {
    const { link } = this.props;
    if (link) return this.renderLink();
    return this.renderButton();
  }
}
