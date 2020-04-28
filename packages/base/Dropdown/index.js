import AsyncSelect from 'react-select/async';
import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import Select from 'react-select';
import themeVariantToValue from '@spraoi/helpers/theme-variant-to-value';
import uniqBy from 'lodash/uniqBy';
import { ThemeContext } from 'styled-components';
import InputWrapper from '../InputWrapper';
import Box from '../Box';
import Option from './Option';
import ValueContainer from './ValueContainer';

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
    clearIndicator: (base) => {
      return {
        ...base,
        '&:hover': { color: theme.colors.error, transform: 'scale(1)' },
        transform: 'scale(0.8)',
        transition: 'color 0.5s, transform 0.5s',
      };
    },
    container: (base) => ({ ...base, flex: 1 }),
    control: (base, { isFocused }) => ({
      ...base,
      '&:hover': { border: getBorder({ isFocused }) },
      '> div': {
        height: 'calc(100% - 4px)',
        margin: '2px 0',
        overflow: 'auto',
      },
      backgroundColor,
      border: getBorder({ isFocused }),
      borderRadius,
      boxShadow: 0,
      height,
      minHeight: height,
      padding: 0,
    }),
    dropdownIndicator: (base, state) => {
      const { selectProps } = state;
      const { menuIsOpen } = selectProps;
      if (menuIsOpen) {
        return {
          ...base,
          color: 'accent',
          padding: `0 ${paddingX}`,
          transform: 'rotate(-180deg)',
          transition: 'transform 0.4s ease-in-out',
        };
      }
      return {
        ...base,
        padding: `0 ${paddingX}`,
        transform: 'rotate(0deg)',
        transition: 'transform 0.4s ease-in-out',
      };
    },
    indicatorSeparator: (base) => ({
      ...base,
      backgroundColor: getBorderColor(),
    }),
    input: () => ({
      position: 'absolute',
    }),
    multiValue: (base) => ({
      ...base,
      '+ *[class*="-Input"]': {
        position: 'static',
      },
    }),
    option: (base, state) => {
      const { isMulti, isSelected } = state;
      if (isMulti) {
        return {
          ...base,
          '&:hover': {
            backgroundColor: theme.colors.grays[2],
            color: theme.colors.grays[4],
          },
          backgroundColor: 'white',
          color: isSelected ? theme.colors.accent : theme.colors.grays[5],
          wordBreak: 'break-word',
        };
      }
      return {
        ...base,
        wordBreak: 'break-word',
      };
    },
    placeholder: () => ({
      color: placeholderColor,
    }),
    singleValue: (base) => ({
      ...base,
      maxWidth: 'calc(100% - 1.5rem)',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    }),
    valueContainer: (base) => ({
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
    <InputWrapper dataCy={rest['data-cy']} input={input} {...rest}>
      {({
        backspaceRemoves = false,
        checkIcon,
        error,
        externalAsyncOptions = null,
        isMulti,
        loadOptions,
        placeholder = '',
        setExternalAsyncOptions,
        uncheckIcon,
        ...inputRest
      }) => {
        const overrideStyles = getOverrideStyles({ error, theme });

        const getOptionLabel = (option) => (
          <span title={option.subtext}>
            <Box
              sx={{
                alignItems: 'flex-start',
                display: 'flex',
                justifyContent: 'space-between',
                mb: 1,
              }}
            >
              <Box sx={{ flex: 'auto', mr: 2, wordBreak: 'break-all' }}>
                {option.label}
              </Box>
              {option.pill && (
                <Box
                  sx={{
                    bg: 'orange',
                    borderRadius: 1,
                    color: 'white',
                    flex: 'none',
                    fontSize: 1,
                    p: 1,
                  }}
                >
                  {option.pill}
                </Box>
              )}
            </Box>
            <Box
              sx={{
                color: 'grays.4',
                fontSize: 2,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {option.subtext}
            </Box>
          </span>
        );

        const onChange = (value, meta) => {
          let parsedValue = '';

          if (value) {
            if (Array.isArray(value)) {
              parsedValue = value.length ? value.map((o) => o.value) : '';
            } else {
              parsedValue = value.value;
            }
          }

          if (inputRest.onChange) inputRest.onChange(parsedValue, meta);
          input.onChange(parsedValue, meta);
        };

        const optionByValue = (value) => {
          // after search add new options in state
          const newAsyncOptions = externalAsyncOptions || asyncOptions;

          return [...(inputRest.options || []), ...newAsyncOptions].find(
            (o) => o.value === value
          );
        };

        const value = Array.isArray(input.value)
          ? input.value.map(optionByValue)
          : optionByValue(input.value) || '';

        const components = isMulti ? { Option, ValueContainer } : {};

        return loadOptions ? (
          <AsyncSelect
            {...inputRest}
            {...input}
            backspaceRemoves={backspaceRemoves}
            checkIcon={checkIcon}
            closeMenuOnSelect={!isMulti}
            components={components}
            defaultOptions
            hideSelectedOptions={false}
            isMulti={isMulti}
            loadOptions={async (query) => {
              let options = await loadOptions(query);

              if (externalAsyncOptions) {
                // after search add new options in state & remove duplicate
                // options from state.
                setExternalAsyncOptions((prevOptions) =>
                  uniqBy([...prevOptions, ...options], 'value')
                );
              } else {
                setAsyncOptions(options);
              }

              // check for subtext and display if exists
              options = options.map((option) => {
                return {
                  label:
                    typeof option.subtext !== 'undefined'
                      ? getOptionLabel(option)
                      : option.label,
                  subtext: option.subtext,
                  value: option.value,
                };
              });

              return options;
            }}
            onChange={onChange}
            placeholder={placeholder}
            styles={overrideStyles}
            uncheckIcon={uncheckIcon}
            value={value}
          />
        ) : (
          <Select
            {...inputRest}
            {...input}
            backspaceRemoves={backspaceRemoves}
            checkIcon={checkIcon}
            closeMenuOnSelect={!isMulti}
            components={components}
            defaultValue={value}
            hideSelectedOptions={false}
            isMulti={isMulti}
            onChange={onChange}
            placeholder={placeholder}
            styles={overrideStyles}
            uncheckIcon={uncheckIcon}
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
