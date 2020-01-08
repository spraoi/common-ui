import PropTypes from 'prop-types';
import React from 'react';
import Box from '../Box';

const InputWrapper = ({
  children,
  dataCy,
  disabled,
  indicatorIcon,
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
  let validatorIcon = null;
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
  if (indicatorIcon && meta.touched) {
    validatorIcon = (
      <Box
        sx={{
          alignItems: 'center',
          bg: 'white',
          color: `${error ? 'error' : 'success'}`,
          display: 'flex',
          height: 'calc(100% - 4px)',
          m: '2px',
          p: 4,
          position: 'absolute',
          right: '0',
          top: '0',
        }}
      >
        {indicatorIcon}
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
            mb: 1,
            ...labelSx,
          }}
        >
          {label}
        </Box>
      )}
      {validatorIcon ? (
        <Box sx={{ position: 'relative' }}>
          {children({ disabled, error, ...rest })}
          {meta.touched ? validatorIcon : null}
        </Box>
      ) : (
        children({ disabled, error, ...rest })
      )}
      {below}
    </Box>
  );
};
InputWrapper.propTypes = {
  children: PropTypes.func.isRequired,
  dataCy: PropTypes.string,
  disabled: PropTypes.bool,
  htmlFor: PropTypes.string,
  indicatorIcon: PropTypes.node,
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
  dataCy: null,
  disabled: false,
  htmlFor: null,
  indicatorIcon: null,
  label: null,
  labelSx: {},
  subtext: null,
  wrapperSx: {},
};

export default InputWrapper;
