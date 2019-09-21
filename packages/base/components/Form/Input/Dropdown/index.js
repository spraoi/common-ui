import AsyncSelect from 'react-select/async';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Select from 'react-select';
import uniqBy from 'lodash/uniqBy';
import { ThemeConsumer } from 'styled-components';
import InputWrapper from '../InputWrapper';

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
            const height = `calc(${theme.space[2]} * 2 + ${
              theme.lineHeights[1]
            })`;

            const getBorderColor = ({ isFocused }) => {
              if (isFocused) {
                return theme.variants.inputs.primary['&:focused'].borderColor;
              }

              if (inputRest.error) return theme.colors.error;
              return theme.variants.inputs.primary.borderColor;
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
                backgroundColor: theme.variants.inputs.primary.bg,
                border: `solid 1px ${getBorderColor({ isFocused })}`,
                borderRadius: theme.radii[1],
                boxShadow: 0,
                minHeight: height,
              }),
              option: base => ({
                ...base,
              }),
              placeholder: base => ({
                ...base,
                color: theme.variants.inputs.primary['&::placeholder'].color,
              }),
              valueContainer: base => ({
                ...base,
                border: 0,
                borderRadius: theme.radii[1],
              }),
            };

            const onChange = (value, meta) => {
              let parsedValue = '';

              if (value) {
                if (Array.isArray(value)) {
                  parsedValue = value.length ? value.map(o => o.value) : '';
                } else {
                  parsedValue = value.value;
                }
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
    value: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.number,
      PropTypes.string,
    ]),
  }).isRequired,
};

export default Dropdown;
