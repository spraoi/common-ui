import PropTypes from 'prop-types';
import React from 'react';
import { Field } from 'react-final-form';
import Box from '../Box';
import Radio from '../Checkbox';

const CheckboxGroup = ({
  inline,
  inputLabelSx,
  inputWrapperSx,
  label,
  labelSx,
  name,
  options,
  type,
  wrapperSx,
  ...rest
}) => {
  return (
    <>
      {label && (
        <Box
          sx={{
            color: 'text.subtle',
            fontSize: 2,
            fontWeight: 'bold',
            letterSpacing: 0,
            mt: 6,
            textTransform: 'uppercase',
            ...inputLabelSx,
          }}
        >
          {label}
        </Box>
      )}
      <Box
        sx={{
          alignItems: 'flex-start',
          display: 'flex',
          flexDirection: inline ? 'row' : 'column',
          mt: 4,
        }}
      >
        {options.map(({ label, value }) => (
          <Box
            key={value}
            sx={{
              alignItems: 'center',
              display: 'flex',
              mb: inline ? '' : 3,
              mr: inline ? 6 : '',
            }}
          >
            <Field
              component={Radio}
              errorSx={{ width: '100%' }}
              inputWrapperSx={inputWrapperSx}
              label={label}
              labelSx={{ mt: 2, ...labelSx }}
              name={name}
              type={type}
              value={value}
              wrapperSx={{
                alignItems: 'center',
                display: 'flex',
                flexWrap: 'wrap',
                ...wrapperSx,
              }}
              {...rest}
            />
          </Box>
        ))}
      </Box>
    </>
  );
};
CheckboxGroup.propTypes = {
  inline: PropTypes.bool,
  inputLabelSx: PropTypes.shape({}),
  inputWrapperSx: PropTypes.shape({}),
  label: PropTypes.string,
  labelSx: PropTypes.shape({}),
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  type: PropTypes.oneOf(['checkbox', 'radio']),
  wrapperSx: PropTypes.shape({}),
};

CheckboxGroup.defaultProps = {
  inline: false,
  inputLabelSx: {},
  inputWrapperSx: {},
  label: null,
  labelSx: {},
  type: 'radio',
  wrapperSx: {},
};

export default CheckboxGroup;
