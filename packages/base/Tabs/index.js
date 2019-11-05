import PropTypes from 'prop-types';
import React from 'react';
import get from 'lodash/get';
import { Location } from '@reach/router';
import { parse, stringify } from 'query-string';
import TabDropdown from './TabDropdown';
import TabLinks from './TabLinks';

const Tabs = ({ defaultTab, dropdown, label, name, sx, tabs }) => (
  <Location>
    {({ location }) => {
      const queryParams = parse(location.search);
      const currentTab = get(queryParams, name, defaultTab);

      const generateLink = newTab =>
        `${location.pathname}?${stringify({
          ...queryParams,
          [name]: newTab,
        })}`;

      return (
        <>
          {dropdown ? (
            <TabDropdown
              currentTab={currentTab}
              generateLink={generateLink}
              label={label}
              name={name}
              sx={sx}
              tabs={tabs}
            />
          ) : (
            <TabLinks
              currentTab={currentTab}
              generateLink={generateLink}
              sx={sx}
              tabs={tabs}
            />
          )}
          {tabs.find(tab => tab.value === currentTab).render()}
        </>
      );
    }}
  </Location>
);

Tabs.propTypes = {
  defaultTab: PropTypes.string.isRequired,
  dropdown: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  sx: PropTypes.shape({}),
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      render: PropTypes.func.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
};

Tabs.defaultProps = {
  dropdown: false,
  label: null,
  sx: {},
};

export default Tabs;
