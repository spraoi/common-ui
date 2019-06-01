import ReactAutocomplete from 'react-autocomplete';
import PropTypes from 'prop-types';
import React from 'react';
import { ThemeConsumer } from 'styled-components';
import InputWrapper from './InputWrapper';

const Autocomplete = ({ input, ...rest }) => (
  <InputWrapper input={input} {...rest}>
    {props => (
      <ThemeConsumer>
        {() => <ReactAutocomplete id={input.name} {...props} {...input} />}
      </ThemeConsumer>
    )}
  </InputWrapper>
);

Autocomplete.propTypes = {
  input: PropTypes.shape({ name: PropTypes.string.isRequired }).isRequired,
};

export default Autocomplete;
