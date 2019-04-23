import { fixSCProps } from '@spraoi/helpers';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';
import { BarLoader } from 'react-spinners';
import { Link } from 'gatsby';
import Box, { generateSafeComponent } from '../Box';

const buttonStyles = css`
  color: ${p => p.theme.colors.textLink};
  text-decoration: underline;

  ${p =>
    !p.simple &&
    css`
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
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
      cursor: pointer;

      &:hover {
        background-color: ${p => p.theme.colors.primaryLight};
      }

      @media (min-width: ${p => p.theme.breakpoints.md}) {
        max-width: ${p => p.theme.maxWidths.button};
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

const StyledButton = styled(generateSafeComponent({ as: 'button' }))`
  ${buttonStyles};
`;

const StyledLink = styled(generateSafeComponent({ as: Link }))`
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

  renderButton() {
    const {
      children,
      disabled,
      renderLoading,
      submitting,
      type,
      ...rest
    } = this.props;

    const fixedProps = fixSCProps({
      disabled: disabled || submitting,
      type,
      ...rest,
    });

    let buttonChildren = children;

    if (!rest.simple) {
      buttonChildren = submitting ? (
        <StyledChildren>{renderLoading}</StyledChildren>
      ) : (
        <StyledChildren>{children}</StyledChildren>
      );
    }

    return type === Button.types.button ? (
      <Box
        as={StyledButton}
        px={rest.simple ? '0' : 'md'}
        py={rest.simple ? '0' : 'sm'}
        type="button"
        {...fixedProps}
      >
        {buttonChildren}
      </Box>
    ) : (
      <Box
        as={StyledButton}
        px={rest.simple ? '0' : 'md'}
        py={rest.simple ? '0' : 'sm'}
        type="submit"
        {...fixedProps}
      >
        {buttonChildren}
      </Box>
    );
  }

  renderLink() {
    const { children, disabled, download, link, ...rest } = this.props;

    delete rest.renderLoading;
    const fixedProps = fixSCProps(rest);

    return download ? (
      <Box
        as={StyledLink}
        download
        href={link}
        px={rest.simple ? '0' : 'md'}
        py={rest.simple ? '0' : 'sm'}
        {...fixedProps}
      >
        {children}
      </Box>
    ) : (
      <Box
        as={StyledLink}
        disabled={disabled}
        px={rest.simple ? '0' : 'md'}
        py={rest.simple ? '0' : 'sm'}
        to={link}
        {...fixedProps}
      >
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
