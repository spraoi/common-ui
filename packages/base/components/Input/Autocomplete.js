import ReactAutocomplete from 'react-autocomplete';
import PropTypes from 'prop-types';
import React from 'react';
import styled, { ThemeConsumer, css } from 'styled-components';
import InputWrapper from './InputWrapper';
import { StyledInput } from './Input';

const Suggestion = styled.div`
  padding: ${p => p.theme.space.xs};
  cursor: pointer;

  ${p =>
    p.isHighlighted &&
    css`
      background-color: ${p => p.theme.colors.accent};
      color: ${p => p.theme.colors.white};
    `}
`;

Suggestion.propTypes = {
  isHighlighted: PropTypes.bool.isRequired,
};

const Autocomplete = ({ input, items, ...rest }) => (
  <InputWrapper input={input} {...rest}>
    {props => (
      <ThemeConsumer>
        {theme => (
          <ReactAutocomplete
            getItemValue={v => v}
            id={input.name}
            items={items}
            menuStyle={{
              backgroundColor: theme.colors.white,
              border: `solid 1px ${theme.colors.border}`,
              borderRadius: theme.radii.md,
              boxShadow: theme.boxShadows.md,
              left: '0',
              maxHeight: '50vh',
              overflow: 'auto',
              padding: `${theme.space.xxxs} 0`,
              position: 'absolute',
              top: `calc(100% + ${theme.space.xxs})`,
              zIndex: '1',
            }}
            onSelect={input.onChange}
            open={!!items.length}
            renderInput={inputProps => <StyledInput {...inputProps} />}
            renderItem={(item, isHighlighted) => (
              <Suggestion key={item} isHighlighted={isHighlighted}>
                {item}
              </Suggestion>
            )}
            wrapperProps={{ style: { display: 'block', position: 'relative' } }}
            {...input}
            {...props}
          />
        )}
      </ThemeConsumer>
    )}
  </InputWrapper>
);

Autocomplete.propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  }).isRequired,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Autocomplete;
