import PropTypes from 'prop-types';
import React from 'react';
import Box from '../Box';

const InputWrapper = ({
  children,
  disabled,
  htmlFor,
  input,
  label,
  labelSx,
  meta,
  subtext,
  wrapperSx,
  ...rest
}) => {
  const error = meta.error && meta.touched ? 1 : 0;
  let below = null;

  if (error) {
    below = (
      <Box color="error" fontSize={2} mt={1}>
        {meta.error}
      </Box>
    );
  } else if (subtext) {
    below = (
      <Box fontSize={2} mt={1}>
        {subtext}
      </Box>
    );
  }

  return (
    <Box
      sx={{
        '&:first-of-type': { mt: 0 },
        flex: 1,
        mt: 6,
        opacity: disabled ? '0.3' : null,
        pointerEvents: disabled ? 'none' : null,
        position: 'relative',
        ...wrapperSx,
      }}
    >
      {label && (
        <Box
          as="label"
          htmlFor={htmlFor || input.name}
          sx={{
            color: 'text.subtle',
            cursor: 'pointer',
            display: 'block',
            mb: 1,
            ...labelSx,
          }}
        >
          {label}
        </Box>
      )}
      {children({ disabled, error, ...rest })}
      {below}
    </Box>
  );
};

InputWrapper.propTypes = {
  children: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  htmlFor: PropTypes.string,
  input: PropTypes.shape({ name: PropTypes.string.isRequired }).isRequired,
  label: PropTypes.node,
  labelSx: PropTypes.shape({}),
  meta: PropTypes.shape({
    error: PropTypes.string,
    touched: PropTypes.bool.isRequired,
  }).isRequired,
  subtext: PropTypes.node,
  wrapperSx: PropTypes.shape({}),
};

InputWrapper.defaultProps = {
  disabled: false,
  htmlFor: null,
  label: null,
  labelSx: {},
  subtext: null,
  wrapperSx: {},
};

export default InputWrapper;