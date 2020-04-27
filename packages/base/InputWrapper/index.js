import PropTypes from 'prop-types';
import React from 'react';
import Box from '../Box';

const InputWrapper = ({
  children,
  dataCy,
  disabled,
  errorSx,
  validationIcon,
  htmlFor,
  input,
  inputWrapperSx,
  label,
  labelSx,
  meta,
  subtext,
  wrapperSx,
  ...rest
}) => {
  const error = meta.error && meta.touched;
  let below = null;

  if (error) {
    below = (
      <Box
        sx={{
          color: 'error',
          fontSize: 2,
          mt: 1,
          ...errorSx,
        }}
      >
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
      data-cy={dataCy}
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
            fontSize: 2,
            fontWeight: 'bold',
            letterSpacing: 0,
            mb: 1,
            textTransform: 'uppercase',
            ...labelSx,
          }}
        >
          {label}
        </Box>
      )}
      <Box sx={{ position: 'relative', ...inputWrapperSx }}>
        {children({ disabled, error, ...rest })}
        {validationIcon && meta.touched && (
          <Box
            sx={{
              alignItems: 'center',
              bg: 'white',
              color: `${error ? 'error' : 'success'}`,
              display: 'flex',
              height: 'calc(100% - 4px)',
              m: '2px',
              position: 'absolute',
              right: '0',
              top: '0',
            }}
          >
            {validationIcon(error)}
          </Box>
        )}
      </Box>
      {below}
    </Box>
  );
};

InputWrapper.propTypes = {
  children: PropTypes.func.isRequired,
  dataCy: PropTypes.string,
  disabled: PropTypes.bool,
  errorSx: PropTypes.shape({}),
  htmlFor: PropTypes.string,
  input: PropTypes.shape({ name: PropTypes.string.isRequired }).isRequired,
  inputWrapperSx: PropTypes.shape({}),
  label: PropTypes.node,
  labelSx: PropTypes.shape({}),
  meta: PropTypes.shape({
    error: PropTypes.string,
    touched: PropTypes.bool.isRequired,
  }).isRequired,
  subtext: PropTypes.node,
  validationIcon: PropTypes.func,
  wrapperSx: PropTypes.shape({}),
};

InputWrapper.defaultProps = {
  dataCy: null,
  disabled: false,
  errorSx: {},
  htmlFor: null,
  inputWrapperSx: {},
  label: null,
  labelSx: {},
  subtext: null,
  validationIcon: () => null,
  wrapperSx: {},
};

export default InputWrapper;
