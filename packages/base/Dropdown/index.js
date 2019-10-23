import AsyncSelect from 'react-select/async';
import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import Select from 'react-select';
import uniqBy from 'lodash/uniqBy';
import { ThemeContext } from 'styled-components';
import { themeVariantToValue } from '@spraoi/helpers';
import InputWrapper from '../InputWrapper';
import Box from '../Box';

const getOverrideStyles = ({ error, theme }) => {
  const getBorderColor = ({ isFocused } = {}) => {
    if (isFocused) {
      return themeVariantToValue(
        theme,
        'colors',
        'inputs.primary.&:focus.borderColor'
      );
    }

    if (error) return theme.colors.error;
    return themeVariantToValue(theme, 'colors', 'inputs.primary.borderColor');
  };

  const getBorder = ({ isFocused } = {}) => {
    const borderWidth = themeVariantToValue(
      theme,
      'sizes',
      'inputs.primary.borderWidth'
    );

    const borderColor = getBorderColor({ isFocused });
    return `${theme.variants.inputs.primary.borderStyle} ${borderWidth} ${borderColor}`;
  };

  const borderRadius = themeVariantToValue(
    theme,
    'radii',
    'inputs.primary.borderRadius'
  );

  const backgroundColor = themeVariantToValue(
    theme,
    'colors',
    'inputs.primary.bg'
  );

  const placeholderColor = themeVariantToValue(
    theme,
    'colors',
    'inputs.primary.&::placeholder.color'
  );

  const paddingX = themeVariantToValue(theme, 'space', 'inputs.primary.px');
  const paddingY = themeVariantToValue(theme, 'space', 'inputs.primary.py');
  const height = `calc(${paddingY} * 2 + ${theme.lineHeights[1]})`;

  return {
    container: base => ({ ...base, flex: 1 }),
    control: (base, { isFocused }) => ({
      ...base,
      '&:hover': { border: getBorder({ isFocused }) },
      backgroundColor,
      border: getBorder({ isFocused }),
      borderRadius,
      boxShadow: 0,
      height,
      minHeight: height,
      padding: 0,
    }),
    dropdownIndicator: base => ({ ...base, padding: `0 ${paddingX}` }),
    indicatorSeparator: base => ({
      ...base,
      backgroundColor: getBorderColor(),
    }),
    placeholder: () => ({ color: placeholderColor }),
    singleValue: () => ({
      '> span > * ': {
        display: 'none',
      },
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    }),
    valueContainer: base => ({
      ...base,
      border: 0,
      borderRadius,
      padding: `0 ${paddingX}`,
    }),
  };
};

const Dropdown = ({ input, ...rest }) => {
  const theme = useContext(ThemeContext);
  const [asyncOptions, setAsyncOptions] = useState([]);

  return (
    <InputWrapper input={input} {...rest}>
      {({
        backspaceRemoves = false,
        error,
        externalAsyncOptions = null,
        loadOptions,
        placeholder = '',
        setExternalAsyncOptions,
        ...inputRest
      }) => {
        const overrideStyles = getOverrideStyles({ error, theme });

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
              let options = await loadOptions(query);

              if (externalAsyncOptions) {
                // after search add new options in state & remove duplicate
                // options from state.
                setExternalAsyncOptions(prevOptions =>
                  uniqBy([...prevOptions, ...options], 'value')
                );
              } else {
                setAsyncOptions(options);
              }

              // check for subtext and display if exists
              const checkSubText = options.some(option => {
                return 'subtext' in option;
              });
              if (checkSubText) {
                options = options.map(option => {
                  return {
                    label:
                      typeof option.subtext !== 'undefined' ? (
                        <span>
                          {option.label} <br />
                          <small style={{ opacity: '0.3' }}>
                            <Box color="gray5">{option.subtext}</Box>
                          </small>
                        </span>
                      ) : (
                        option.label
                      ),
                    subtext: option.subtext,
                    value: option.value,
                  };
                });
              }

              return options;
            }}
            onChange={onChange}
            placeholder={placeholder}
            styles={overrideStyles}
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
            styles={overrideStyles}
            value={value}
          />
        );
      }}
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
