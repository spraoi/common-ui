import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';
import { BarLoader } from 'react-spinners';
import { Link } from 'gatsby';

const StyledButton = styled.button`
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
      padding: ${p => p.theme.space.sm} ${p => p.theme.space.md};
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
          background-color: ${p => p.theme.colors.secondary};

          &:hover {
            background-color: ${p => p.theme.colors.secondaryLight};
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

    const buttonProps = { disabled: disabled || submitting, type, ...rest };

    let buttonChildren = children;

    if (!rest.simple) {
      buttonChildren = submitting ? (
        <StyledChildren>{renderLoading}</StyledChildren>
      ) : (
        <StyledChildren>{children}</StyledChildren>
      );
    }

    return type === Button.types.button ? (
      <StyledButton type="button" {...buttonProps}>
        {buttonChildren}
      </StyledButton>
    ) : (
      <StyledButton type="submit" {...buttonProps}>
        {buttonChildren}
      </StyledButton>
    );
  }

  renderLink() {
    const { children, disabled, download, link, ...rest } = this.props;

    return download ? (
      <StyledButton as="a" download href={link} {...rest}>
        {children}
      </StyledButton>
    ) : (
      <StyledButton as={Link} disabled={disabled} to={link} {...rest}>
        {children}
      </StyledButton>
    );
  }

  render() {
    const { link } = this.props;
    if (link) return this.renderLink();
    return this.renderButton();
  }
}
