import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { BarLoader } from 'react-spinners';
import { Link } from 'gatsby';
import { StyledButton, StyledChildren } from './styled';

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
      simple,
      submitting,
      type,
      ...rest
    } = this.props;

    const buttonProps = { disabled: disabled || submitting, type, ...rest };

    const buttonChildren = simple ? (
      children
    ) : (
      <React.Fragment>
        {submitting ? (
          <StyledChildren>{renderLoading}</StyledChildren>
        ) : (
          <StyledChildren>{children}</StyledChildren>
        )}
      </React.Fragment>
    );

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
      <Button as="a" download href={link} {...rest}>
        {children}
      </Button>
    ) : (
      <Button as={Link} disabled={disabled} to={link} {...rest}>
        {children}
      </Button>
    );
  }

  render() {
    const { link } = this.props;
    if (link) return this.renderLink();
    return this.renderButton();
  }
}
