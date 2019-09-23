import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import ReactAutocomplete from 'react-autocomplete';
import { ThemeContext } from 'styled-components';
import { themeVariantToValue } from '@spraoi/helpers';
import Box from '../../../Box';
import InputWrapper from '../InputWrapper';

const Autocomplete = ({ input, items, ...rest }) => {
  const theme = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <InputWrapper input={input} {...rest}>
      {props => (
        <ReactAutocomplete
          getItemValue={v => v}
          id={input.name}
          items={items}
          menuStyle={{
            backgroundColor: theme.colors.white,
            borderColor: themeVariantToValue(
              theme,
              'colors',
              'inputs.primary.&:focus.borderColor'
            ),
            borderRadius: themeVariantToValue(
              theme,
              'radii',
              'inputs.primary.borderRadius'
            ),
            borderStyle: theme.variants.inputs.primary.borderStyle,
            borderWidth: themeVariantToValue(
              theme,
              'sizes',
              'inputs.primary.borderWidth'
            ),
            boxShadow: theme.shadows[1],
            left: '0',
            maxHeight: '50vh',
            overflow: 'auto',
            padding: `${theme.space[1]} 0`,
            position: 'absolute',
            top: `calc(100% + ${theme.space[2]})`,
            zIndex: '1',
          }}
          onMenuVisibilityChange={setIsOpen}
          onSelect={input.onChange}
          open={!!items.length && isOpen}
          renderInput={inputProps => (
            <Box
              as="input"
              borderColor={input.error ? 'error' : null}
              variant="inputs.primary"
              width="100%"
              {...inputProps}
            />
          )}
          renderItem={(item, isHighlighted) => (
            <Box
              key={item}
              bg={isHighlighted ? 'accent' : null}
              color={isHighlighted ? 'white' : null}
              p={2}
              sx={{ cursor: 'pointer' }}
            >
              {item}
            </Box>
          )}
          wrapperProps={{ style: { display: 'block', position: 'relative' } }}
          {...input}
          {...props}
        />
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
