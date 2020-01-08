import isEmail from 'validator/lib/isEmail';
import moment from 'moment';

export const alpha = value => {
  if (!/^[a-z]*$/i.test(value)) return 'Must contain only letters';
};

const fileExtension = /(?:\.([^.]+))?$/;
export const checkFileExtension = allowExtensions => value => {
  if (!allowExtensions.includes(fileExtension.exec(value)[1])) {
    return 'Invalid file';
  }
};

export const composeValidations = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined);

export const date = format => {
  return value => {
    if (value && !moment(value, format, true).isValid()) return 'Invalid date';
  };
};

export const email = value => {
  if (value && !isEmail(value)) return 'Invalid email';
};

export const float = precision => value => {
  const maxPrecision = precision || 2;
  if (
    value &&
    !new RegExp(`^[-+]?[0-9]+.[0-9]{1,${maxPrecision}}$`).test(value)
  ) {
    return 'Invalid float';
  }
};

export const integer = value => {
  if (value && !/^[-+]?[0-9]+$/.test(value)) return 'Invalid integer';
};

export const json = value => {
  if (!value) return;

  try {
    JSON.parse(value);
  } catch (e) {
    return 'Invalid JSON';
  }
};

export const minLength = length => value => {
  if (value && value.length < length) {
    return `Must be at least ${length} characters`;
  }
};

export const required = value => {
  if (
    value === undefined ||
    value === '' ||
    (Array.isArray(value) && !value.length)
  ) {
    return 'Required';
  }
};

export const versionNumber = value => {
  if (value && !/^[0-9]+(\.[0-9]+)?$/.test(value)) {
    return 'Invalid version number';
  }
};
