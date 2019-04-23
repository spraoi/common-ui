import PropTypes from 'prop-types';
import React from 'react';
import Select from 'react-select';
import AsyncSelect from 'react-select/lib/Async';
import { ThemeConsumer } from 'styled-components';
import InputWrapper from './InputWrapper';

const Dropdown = ({ input, ...rest }) => (
  <InputWrapper input={input} {...rest}>
    {({
      backspaceRemoves = false,
      loadOptions,
      placeholder = '',
      value,
      ...inputRest
    }) => (
      <ThemeConsumer>
        {theme => {
          const height = `calc(${theme.space.xs} * 2 + ${
            theme.lineHeights.md
          })`;

          const getBorderColor = ({ isFocused }) => {
            if (isFocused) return theme.colors.inputPrimaryBorderFocus;
            if (inputRest.error) return theme.colors.error;
            return theme.colors.inputPrimaryBorder;
          };

          const styles = {
            control: (base, { isFocused }) => ({
              ...base,
              '&:hover': {
                border: `solid 1px ${getBorderColor({ isFocused })}`,
              },
              backgroundColor: theme.colors.inputPrimaryBg,
              border: `solid 1px ${getBorderColor({ isFocused })}`,
              borderRadius: theme.radii.md,
              boxShadow: 0,
              height,
              minHeight: height,
            }),
            option: base => ({
              ...base,
              // TODO: customize
            }),
            valueContainer: base => ({
              ...base,
              border: 0,
              borderRadius: theme.radii.md,
            }),
          };

          const onChange = (value, meta) =>
            input.onChange(
              Array.isArray(value) ? value.map(o => o.value) : value.value,
              meta
            );

          const optionByValue = value =>
            inputRest.options.find(o => o.value === value);

          const value = Array.isArray(input.value)
            ? input.value.map(optionByValue)
            : optionByValue(value);

          return loadOptions ? (
            <AsyncSelect
              {...input}
              backspaceRemoves={backspaceRemoves}
              cacheOptions
              defaultOptions
              loadOptions={loadOptions}
              onChange={onChange}
              placeholder={placeholder}
              styles={styles}
              value={value}
              {...inputRest}
            />
          ) : (
            <Select
              {...input}
              backspaceRemoves={backspaceRemoves}
              defaultValue={value}
              onChange={onChange}
              placeholder={placeholder}
              styles={styles}
              value={value}
              {...inputRest}
            />
          );
        }}
      </ThemeConsumer>
    )}
  </InputWrapper>
);

Dropdown.propTypes = {
  input: PropTypes.shape({ name: PropTypes.string.isRequired }).isRequired,
};

export default Dropdown;
