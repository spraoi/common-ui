import AsyncSelect from 'react-select/async';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Select from 'react-select';
import uniqBy from 'lodash/uniqBy';
import { ThemeConsumer } from 'styled-components';
import InputWrapper from './InputWrapper';

const Dropdown = ({ input, ...rest }) => {
  const [asyncOptions, setAsyncOptions] = useState([]);

  return (
    <InputWrapper input={input} {...rest}>
      {({
        externalAsyncOptions = null,
        backspaceRemoves = false,
        loadOptions,
        placeholder = '',
        setExternalAsyncOptions,
        ...inputRest
      }) => (
        <ThemeConsumer>
          {theme => {
            const height = `calc(${theme.space.xs} * 2 + ${theme.lineHeights.md})`;

            const getBorderColor = ({ isFocused }) => {
              if (isFocused) return theme.colors.inputPrimaryBorderFocus;
              if (inputRest.error) return theme.colors.error;
              return theme.colors.inputPrimaryBorder;
            };

            const styles = {
              container: base => ({
                ...base,
                flex: 1,
              }),
              control: (base, { isFocused }) => ({
                ...base,
                '&:hover': {
                  border: `solid 1px ${getBorderColor({ isFocused })}`,
                },
                backgroundColor: theme.colors.inputPrimaryBg,
                border: `solid 1px ${getBorderColor({ isFocused })}`,
                borderRadius: theme.radii.md,
                boxShadow: 0,
                minHeight: height,
              }),
              option: base => ({
                ...base,
                // TODO: customize
              }),
              placeholder: base => ({
                ...base,
                color: theme.colors.inputPrimaryPlaceholderText,
              }),
              valueContainer: base => ({
                ...base,
                border: 0,
                borderRadius: theme.radii.md,
              }),
            };

            const onChange = (value, meta) => {
              let parsedValue = '';

              if (value) {
                parsedValue = Array.isArray(value)
                  ? value.map(o => o.value)
                  : value.value;
              }

              if (inputRest.onChange) inputRest.onChange(parsedValue, meta);
              input.onChange(parsedValue, meta);
            };

            const optionByValue = value => {
              // after search add new options in state
              const newAsyncOptions = externalAsyncOptions || asyncOptions;

              return [...(inputRest.options || []), ...newAsyncOptions].find(
                o => o.value === value
              );
            };

            const value = Array.isArray(input.value)
              ? input.value.map(optionByValue)
              : optionByValue(input.value) || '';

            return loadOptions ? (
              <AsyncSelect
                {...inputRest}
                {...input}
                backspaceRemoves={backspaceRemoves}
                defaultOptions
                loadOptions={async query => {
                  const options = await loadOptions(query);

                  if (externalAsyncOptions) {
                    // after search add new options in state & remove duplicate
                    // options from state.
                    setExternalAsyncOptions(prevOptions =>
                      uniqBy([...prevOptions, ...options], 'value')
                    );
                  } else {
                    setAsyncOptions(options);
                  }

                  return options;
                }}
                onChange={onChange}
                placeholder={placeholder}
                styles={styles}
                value={value}
              />
            ) : (
              <Select
                {...inputRest}
                {...input}
                backspaceRemoves={backspaceRemoves}
                defaultValue={value}
                onChange={onChange}
                placeholder={placeholder}
                styles={styles}
                value={value}
              />
            );
          }}
        </ThemeConsumer>
      )}
    </InputWrapper>
  );
};

Dropdown.propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  }).isRequired,
};

export default Dropdown;
