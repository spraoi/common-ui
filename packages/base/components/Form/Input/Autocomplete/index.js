import ReactAutocomplete from 'react-autocomplete';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styled, { ThemeConsumer, css } from 'styled-components';
import Box from '../../../Box';
import InputWrapper from '../InputWrapper';

const Suggestion = styled.div`
  padding: ${p => p.theme.space[2]};
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

const Autocomplete = ({ input, items, ...rest }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
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
                border: theme.variants.inputs.primary.border,
                borderRadius: theme.radii[1],
                boxShadow: theme.shadows[1],
                left: '0',
                maxHeight: '50vh',
                overflow: 'auto',
                padding: `${theme.space[0]} 0`,
                position: 'absolute',
                top: `calc(100% + ${theme.space[1]})`,
                zIndex: '1',
              }}
              onMenuVisibilityChange={setIsOpen}
              onSelect={input.onChange}
              open={!!items.length && isOpen}
              renderInput={inputProps => (
                <Box
                  as="input"
                  borderColor={input.error ? 'error' : null}
                  borderRadius={1}
                  px={3}
                  py={2}
                  variant="inputs.primary"
                  width="100%"
                  {...inputProps}
                />
              )}
              renderItem={(item, isHighlighted) => (
                <Suggestion key={item} isHighlighted={isHighlighted}>
                  {item}
                </Suggestion>
              )}
              wrapperProps={{
                style: { display: 'block', position: 'relative' },
              }}
              {...input}
              {...props}
            />
          )}
        </ThemeConsumer>
      )}
    </InputWrapper>
  );
};

Autocomplete.propTypes = {
  input: PropTypes.shape({
    error: PropTypes.bool,
    name: PropTypes.string,
    onChange: PropTypes.func,
  }).isRequired,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Autocomplete;
