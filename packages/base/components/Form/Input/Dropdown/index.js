import AsyncSelect from 'react-select/async';
import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import Select from 'react-select';
import uniqBy from 'lodash/uniqBy';
import { ThemeContext } from 'styled-components';
import InputWrapper from '../InputWrapper';

const getOverrideStyles = ({
  error,
  theme: {
    colors,
    space,
    radii,
    lineHeights,
    variants: {
      inputs: { primary },
    },
  },
}) => {
  const getBorder = ({ isFocused }) => {
    const getBorderColor = ({ isFocused }) => {
      if (isFocused) return colors[primary['&:focus'].borderColor];
      if (error) return colors.error;
      return colors[primary.borderColor];
    };

    const borderColor = getBorderColor({ isFocused });
    return `${primary.borderStyle} ${primary.borderWidth} ${borderColor}`;
  };

  return {
    container: base => ({
      ...base,
      flex: 1,
    }),
    control: (base, { isFocused }) => ({
      ...base,
      '&:hover': { border: getBorder({ isFocused }) },
      backgroundColor: colors[primary.bg],
      border: getBorder({ isFocused }),
      borderRadius: radii[primary.borderRadius],
      boxShadow: 0,
      minHeight: `calc(${space[primary.py]} * 2 + ${lineHeights[1]})`,
    }),
    option: base => ({ ...base }),
    placeholder: base => ({
      ...base,
      color: colors[primary['&::placeholder'].color],
    }),
    valueContainer: base => ({
      ...base,
      border: 0,
      borderRadius: radii[primary.borderRadius],
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
