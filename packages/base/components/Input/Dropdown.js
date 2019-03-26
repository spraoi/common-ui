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
      onChange,
      placeholder = '',
      value,
      ...inputRest
    }) => (
      <ThemeConsumer>
        {theme => {
          const height = `calc(${theme.space.xs} * 2 + ${
            theme.lineHeights.md
          })`;

          const styles = {
            control: base => ({
              ...base,
              backgroundColor: theme.colors.inputPrimaryBg,
              border: `solid 1px ${
                inputRest.error
                  ? theme.colors.error
                  : theme.colors.inputPrimaryBorder
              }`,
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

          return loadOptions ? (
            <AsyncSelect
              backspaceRemoves={backspaceRemoves}
              cacheOptions
              defaultOptions
              loadOptions={loadOptions}
              onChange={choice => onChange(choice.value)}
              placeholder={placeholder}
              styles={styles}
              {...input}
              {...inputRest}
            />
          ) : (
            <Select
              backspaceRemoves={backspaceRemoves}
              defaultValue={value}
              onChange={choice => onChange(choice.value)}
              placeholder={placeholder}
              styles={styles}
              {...input}
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
