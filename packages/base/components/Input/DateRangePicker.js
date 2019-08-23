import React from 'react';
import styled from 'styled-components';
import DateRange from '@wojtekmaj/react-daterange-picker';
import moment from 'moment';
import Box from '../Box';

const DatePickerWrapper = styled(Box)`
  border: 1px solid ${p => p.theme.colors.border};
  &:focus-within {
    border-color: ${p => p.theme.colors.primary};
  }
  .react-calendar {
    font-family: inherit;
    border-color: ${p => p.theme.colors.border};
    border-radius: ${p => p.theme.radii.md};

    &__tile {
      &:disabled {
        background-color: ${p => p.theme.colors.gray1};
      }
      &:enabled {
        &:focus,
        &:hover {
          background-color: ${p => p.theme.colors.border};
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
      background-color: ${p => p.theme.colors.border};
    }
    &__navigation {
      button:enabled {
        &:hover,
        &:focus {
          background-color: ${p => p.theme.colors.header};
        }
      }
      button[disabled] {
        background-color: ${p => p.theme.colors.gray1};
      }
    }
    &__month-view__days__day {
      &--weekend {
        color: ${p => p.theme.colors.red};
      }
      &--neighboringMonth {
        color: ${p => p.theme.colors.gray5};
      }
    }
  }
  .react-daterange-picker {
    width: 100%;
    padding: ${p => p.theme.space.xxs} ${p => p.theme.space.sm};
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
      box-shadow: ${p => p.theme.boxShadows.sm};
      bottom: calc(100% + 1px) !important;
      left: 50% !important;
      right: unset !important;
      top: unset !important;
      transform: translateX(-50%);
      width: calc(100% + ${p => p.theme.space.md}) !important;
    }
    &__button {
      color: ${p => p.theme.colors.border};
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

const DateRangePicker = ({ ...rest }) => {
  const onChange = (date, meta) => {
    rest.input.onChange(date, meta);
  };
  let newValue = rest.input.value;
  if (Array.isArray(rest.input.value)) {
    newValue = rest.input.value.map(i => moment(i).toDate());
  }
  return (
    <DatePickerWrapper borderRadius="md">
      <DateRange onChange={onChange} value={newValue} {...rest} />
    </DatePickerWrapper>
  );
};

export default DateRangePicker;
