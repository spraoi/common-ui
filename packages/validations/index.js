import isEmail from 'validator/lib/isEmail';

export const alpha = value => {
  if (!/^[a-z]*$/i.test(value)) return 'Must contain only letters';
};

export const composeValidations = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined);

export const email = value => {
  if (value && !isEmail(value)) return 'Invalid email';
};

export const floatValue = value => {
  if (!/^[-+]?[0-9]+\.[0-9]+$/i.test(value)) return 'Invalid float number';
};

export const integerValue = value => {
  if (value && Number.isInteger(value)) return 'Invalid number';
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
