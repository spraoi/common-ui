import PropTypes from 'prop-types';
import React from 'react';
import Select from 'react-select';
import AsyncSelect from 'react-select/lib/Async';
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
    }) =>
      loadOptions ? (
        <AsyncSelect
          backspaceRemoves={backspaceRemoves}
          cacheOptions
          defaultOptions
          loadOptions={loadOptions}
          onChange={choice => onChange(choice.value)}
          placeholder={placeholder}
          {...input}
          {...inputRest}
        />
      ) : (
        <Select
          backspaceRemoves={backspaceRemoves}
          defaultValue={value}
          onChange={choice => onChange(choice.value)}
          placeholder={placeholder}
          {...input}
          {...inputRest}
        />
      )
    }
  </InputWrapper>
);

Dropdown.propTypes = {
  input: PropTypes.shape({ name: PropTypes.string.isRequired }).isRequired,
};

export default Dropdown;
