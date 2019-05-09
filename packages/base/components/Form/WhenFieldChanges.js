import PropTypes from 'prop-types';
import React from 'react';
import { Field } from 'react-final-form';
import { OnChange } from 'react-final-form-listeners';

const WhenFieldChanges = ({ becomes, field, set, to }) => (
  <Field name={set} subscription={{}}>
    {({ input: { onChange } }) => (
      <OnChange name={field}>
        {() => {
          if (becomes) onChange(to);
        }}
      </OnChange>
    )}
  </Field>
);

WhenFieldChanges.propTypes = {
  becomes: PropTypes.bool.isRequired,
  field: PropTypes.string.isRequired,
  set: PropTypes.string.isRequired,
  to: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default WhenFieldChanges;
