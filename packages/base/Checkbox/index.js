import PropTypes from 'prop-types';
import React from 'react';
import Box from '../Box';
import InputWrapper from '../InputWrapper';

const Checkbox = ({
  input,
  label,
  labelSx,
  slider,
  sliderSx,
  type,
  ...rest
}) => (
  <InputWrapper
    htmlFor={input.name}
    input={input}
    label={label}
    labelSx={{ m: 0, ml: 4, order: 2, ...labelSx }}
    {...rest}
  >
    {(props) => (
      <>
        {slider ? (
          <Box
            sx={{
              height: '1rem',
              position: 'relative',
              width: '2rem',
              ...sliderSx,
            }}
          >
            <Box
              as="input"
              id={input.name}
              sx={{
                '&:checked': {
                  '+ span': {
                    '&:before': {
                      borderColor: 'accent',
                      transform: 'translateX(100%)',
                    },
                    bg: 'accent',
                  },
                },
                cursor: 'pointer',
                height: '100%',
                opacity: '0',
                position: 'relative',
                width: '100%',
                zIndex: 1,
              }}
              type={type}
              {...props}
              {...input}
            />
            <Box
              as="span"
              sx={{
                '&:before': {
                  bg: 'white',
                  borderColor: 'grays.1',
                  borderRadius: '50%',
                  boxShadow: '0 0 1px 1px',
                  content: '""',
                  height: '100%',
                  left: '0',
                  position: 'absolute',
                  top: '0',
                  width: '50%',
                },
                bg: 'grays.1',
                borderRadius: '1rem',
                bottom: 0,
                left: 0,
                position: 'absolute',
                right: 0,
                top: 0,
              }}
            />
          </Box>
        ) : (
          <Box as="input" id={input.name} type={type} {...props} {...input} />
        )}
      </>
    )}
  </InputWrapper>
);

Checkbox.propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.string,
  }).isRequired,
  label: PropTypes.string.isRequired,
  labelSx: PropTypes.shape({}),
  slider: PropTypes.bool,
  sliderSx: PropTypes.shape({}),
  type: PropTypes.oneOf(['checkbox', 'radio']),
};

Checkbox.defaultProps = {
  labelSx: {},
  slider: false,
  sliderSx: {},
  type: 'checkbox',
};

export default Checkbox;
