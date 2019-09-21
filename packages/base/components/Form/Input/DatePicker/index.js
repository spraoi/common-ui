// TODO: support more than just date ranges!

import DateRange from '@wojtekmaj/react-daterange-picker';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import InputWrapper from '../InputWrapper';

const DatePickerWrapper = styled(InputWrapper)`
  border: ${p => p.theme.variants.inputs.primary.borderStyle}
    ${p => p.theme.variants.inputs.primary.borderWidth}
    ${p => p.theme.variants.inputs.primary.borderColor};

  &:focus-within {
    border-color: ${p =>
      p.theme.variants.inputs.primary['&:focus'].borderColor};
  }

  .react-calendar {
    font-family: inherit;
    border-color: ${p => p.theme.variants.inputs.primary.borderColor};
    border-radius: ${p => p.theme.radii[1]};

    &__tile {
      &:disabled {
        background-color: ${p => p.theme.colors.grays[0]};
      }

      &:enabled {
        &:focus,
        &:hover {
          background-color: ${p => p.theme.grays[0]};
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
      &--weekend {
        color: ${p => p.theme.colors.error};
      }

      &--neighboringMonth {
        color: ${p => p.theme.colors.grays[4]};
      }
    }
  }

  &.react-daterange-picker {
    width: 100%;
    padding: ${p => p.theme.space[1]} ${p => p.theme.space[3]};
    border-radius: ${p => p.theme.radii[1]};
    background-color: ${p => p.theme.variants.inputs.primary.bg};
  }

  .react-daterange-picker {
    &__wrapper {
      border: 0;
      width: 100%;
    }

    &__inputGroup {
      flex-grow: unset;
      min-width: 0;
    }

    &__clear-button {
      margin-left: auto;
    }

    &__calendar {
      width: calc(100% + ${p => p.theme.space[4]}) !important;
      top: unset !important;
      right: unset !important;
      bottom: calc(100% + 1px) !important;
      left: 50% !important;
      transform: translateX(-50%);
      box-shadow: ${p => p.theme.shadows[0]};
    }

    &__button {
      color: ${p => p.theme.colors.gray[1]};

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
