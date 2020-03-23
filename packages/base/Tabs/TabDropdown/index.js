import PropTypes from 'prop-types';
import React from 'react';
import noop from 'lodash/noop';
import { Field, Form } from 'react-final-form';
import { navigate } from '@reach/router';
import Dropdown from '../../Dropdown';

const TabDropdown = ({ currentTab, generateLink, label, name, sx, tabs }) => (
  <Form initialValues={{ [name]: currentTab }} onSubmit={noop}>
    {() => (
      <Field
        component={Dropdown}
        label={label}
        name={name}
        onChange={(tab) => navigate(generateLink(tab), { replace: true })}
        options={tabs}
        wrapperSx={{ maxWidth: ['100%', null, null, '300px'], mb: 6, ...sx }}
      />
    )}
  </Form>
);

TabDropdown.propTypes = {
  currentTab: PropTypes.string.isRequired,
  generateLink: PropTypes.func.isRequired,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  sx: PropTypes.shape({}),
  tabs: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

TabDropdown.defaultProps = {
  label: null,
  sx: {},
};

export default TabDropdown;
