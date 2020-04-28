import PropTypes from 'prop-types';
import React from 'react';
import { components } from 'react-select';

const getLabel = (actual, total, label) => {
  if (actual !== 0 && actual === total) {
    return 'All selected';
  }
  if (actual === 1) {
    return '1 selected';
  }
  if (actual > 0) {
    return `${actual} selected`;
  }

  return label;
};

const ValueContainer = ({ children, ...mainProps }) => {
  const { getValue, options, selectProps } = mainProps;
  const { inputValue, placeholder } = selectProps;
  const label = getLabel(getValue().length, options.length, placeholder);
  return (
    <components.ValueContainer {...mainProps}>
      {children[1]}
      {inputValue === '' && (
        <components.Placeholder {...mainProps}>{label}</components.Placeholder>
      )}
    </components.ValueContainer>
  );
};

ValueContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ValueContainer;
