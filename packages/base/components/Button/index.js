import PropTypes from 'prop-types';
import React from 'react';
import { BarLoader } from 'react-spinners';
import { Link } from 'gatsby';
import Box from '../Box';

const types = {
  button: 'button',
  submit: 'submit',
};

const Button = ({
  children,
  disabled,
  download,
  link,
  renderLoading,
  simple,
  submitting,
  sx,
  type,
  ...rest
}) => {
  const simpleSx = {
    color: 'accent',
  };

  const buttonSx = {
    alignItems: 'center',
    borderRadius: 1,
    boxShadow: 1,
    cursor: 'pointer',
    display: 'flex',
    fontSize: 2,
    fontWeight: 2,
    justifyContent: 'center',
    letterSpacing: 0,
    opacity: disabled ? 0.3 : 1,
    pointerEvents: disabled ? 'none' : 'auto',
    position: 'relative',
    px: 6,
    py: 3,
    textDecoration: 'none',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
  };

  const commonProps = {
    disabled: disabled || submitting,
    sx: { ...(simple ? simpleSx : buttonSx), ...sx },
    variant: simple ? null : 'buttons.primary',
    ...rest,
  };

  if (link) {
    return download ? (
      <Box as={Link} download href={link} {...commonProps}>
        {children}
      </Box>
    ) : (
      <Box as={Link} disabled={disabled} to={link} {...commonProps}>
        {children}
      </Box>
    );
  }

  const innerButton = simple ? (
    children
  ) : (
    <Box
      alignItems="center"
      display="flex"
      height="1em"
      justifyContent="center"
    >
      {submitting ? renderLoading : children}
    </Box>
  );

  return type === types.button ? (
    <Box as="button" type="button" {...commonProps}>
      {innerButton}
    </Box>
  ) : (
    <Box as="button" type="submit" {...commonProps}>
      {innerButton}
    </Box>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  download: PropTypes.bool,
  link: PropTypes.string,
  renderLoading: PropTypes.node,
  simple: PropTypes.bool,
  submitting: PropTypes.bool,
  sx: PropTypes.shape({}),
  type: PropTypes.oneOf([types.button, types.submit]),
};

Button.defaultProps = {
  disabled: false,
  download: false,
  link: null,
  renderLoading: <BarLoader color="white" />,
  simple: false,
  submitting: false,
  sx: {},
  type: types.button,
};

export default Button;
