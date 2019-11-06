import PropTypes from 'prop-types';
import React from 'react';
import get from 'lodash/get';
import { Location } from '@reach/router';
import { generateRedirectPath } from '@spraoi/helpers';
import { parse } from 'query-string';
import TabDropdown from './TabDropdown';
import TabLinks from './TabLinks';
import TabTable from './TabTable';

const Tabs = ({
  defaultTab,
  header,
  label,
  name,
  rows,
  rowTabIndex,
  sx,
  tabs,
  type,
}) => (
  <Location>
    {({ location }) => {
      const queryParams = parse(location.search);
      const currentTab = get(queryParams, name, defaultTab);

      const generateLink = newTab =>
        generateRedirectPath({ ...location, queryParams: { [name]: newTab } });

      const currentTabDetails = tabs.find(tab => tab.value === currentTab);

      return (
        <>
          {type === 'tabs' && (
            <TabLinks
              currentTab={currentTab}
              generateLink={generateLink}
              sx={sx}
              tabs={tabs}
            />
          )}
          {type === 'dropdown' && (
            <TabDropdown
              currentTab={currentTab}
              generateLink={generateLink}
              label={label}
              name={name}
              sx={sx}
              tabs={tabs}
            />
          )}
          {type === 'table' && (
            <TabTable
              currentTab={currentTab}
              generateLink={generateLink}
              header={header}
              rows={rows}
              rowTabIndex={rowTabIndex}
              sx={sx}
              tabs={tabs}
            />
          )}
          {currentTabDetails ? currentTabDetails.render() : null}
        </>
      );
    }}
  </Location>
);

Tabs.propTypes = {
  defaultTab: PropTypes.string,
  header: PropTypes.arrayOf(PropTypes.node),
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.node)),
  rowTabIndex: PropTypes.number,
  sx: PropTypes.shape({}),
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      render: PropTypes.func.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  type: PropTypes.oneOf(['dropdown', 'table', 'tabs']),
};

Tabs.defaultProps = {
  defaultTab: null,
  header: [],
  label: null,
  rows: [],
  rowTabIndex: 0,
  sx: {},
  type: 'tabs',
};

export default Tabs;
