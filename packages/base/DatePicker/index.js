// TODO: support more than just date ranges!

import DateRange from '@wojtekmaj/react-daterange-picker';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { themeVariantToValue } from '@spraoi/helpers';
import InputWrapper from '../InputWrapper';

const DatePickerWrapper = styled(InputWrapper)`
  border: ${p => p.theme.variants.inputs.primary.borderStyle}
    ${p => themeVariantToValue(p.theme, 'sizes', 'inputs.primary.borderWidth')}
    ${p => themeVariantToValue(p.theme, 'colors', 'inputs.primary.borderColor')};

  &:focus-within {
    border-color: ${p =>
      themeVariantToValue(
        p.theme,
        'colors',
        'inputs.primary.&:focus.borderColor'
      )};
  }

  .react-calendar {
    font-family: inherit;
    border-color: ${p =>
      themeVariantToValue(p.theme, 'colors', 'inputs.primary.borderColor')};
    border-radius: ${p =>
      themeVariantToValue(p.theme, 'radii', 'inputs.primary.borderRadius')};

    &__tile {
      &:disabled {
        background-color: ${p => p.theme.colors.grays[0]};
      }

      &:enabled {
        &:focus,
        &:hover {
          background-color: ${p => p.theme.colors.grays[0]};
        }
      }

      &--active {
        background: ${p => p.theme.colors.accent};

        &:enabled {
          &:focus,
          &:hover {
            background: ${p => p.theme.colors.primary};
          }
        }
      }
    }

    &--selectRange &__tile--hover {
      background-color: ${p => p.theme.colors.grays[0]};
    }

    &__navigation {
      button:enabled {
        &:hover,
        &:focus {
          background-color: ${p => p.theme.colors.grays[0]};
        }
      }

      button[disabled] {
        background-color: ${p => p.theme.colors.grays[0]};
      }
    }

    &__month-view__days__day {
      &--neighboringMonth {
        color: ${p => p.theme.colors.grays[4]};
      }
    }
  }

  &.react-daterange-picker {
    width: 100%;
    height: ${p =>
      `calc(${themeVariantToValue(
        p.theme,
        'space',
        'inputs.primary.py'
      )} * 2 + ${p.theme.lineHeights[1]})`};
    padding: 0
      ${p => themeVariantToValue(p.theme, 'space', 'inputs.primary.px')};
    border-radius: ${p =>
      themeVariantToValue(p.theme, 'radii', 'inputs.primary.borderRadius')};
    background-color: ${p =>
      themeVariantToValue(p.theme, 'colors', 'inputs.primary.bg')};
  }

  .react-daterange-picker {
    &__wrapper {
      border: 0;
      width: 100%;
      align-items: center;
    }

    &__inputGroup {
      flex-grow: unset;
      min-width: 0;
    }

    &__clear-button {
      margin-left: auto;
    }

    &__calendar {
      box-shadow: ${p => p.theme.shadows[0]};
    }

    &__button {
      color: ${p => p.theme.colors.grays[1]};

      &:enabled {
        &:focus,
        &:hover {
          color: hsl(0, 0%, 60%);
        }

        svg {
          stroke: currentColor !important;
        }
      }
    }
  }
`;

const DatePicker = ({ input, ...rest }) => {
  const onChange = (date, meta) => {
    input.onChange(date, meta);
  };

  return (
    <DatePickerWrapper input={input} {...rest}>
      {props => (
        <DateRange
          format="MM/dd/y"
          onChange={onChange}
          value={input.value}
          {...props}
        />
      )}
    </DatePickerWrapper>
  );
};

DatePicker.propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  }).isRequired,
};

export default DatePicker;
