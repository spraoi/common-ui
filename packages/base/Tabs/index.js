import PropTypes from 'prop-types';
import React from 'react';
import generateRedirectPath from '@spraoi/helpers/generate-redirect-path';
import get from 'lodash/get';
import { Location } from '@reach/router';
import { parse } from 'query-string';
import TabCarousel from './TabCarousel';
import TabDropdown from './TabDropdown';
import TabLinks from './TabLinks';
import TabTable from './TabTable';

const Tabs = ({ defaultTab, name, tabs, type, ...rest }) => (
  <Location>
    {({ location }) => {
      const queryParams = parse(location.search);
      const currentTab = get(queryParams, name, defaultTab);

      const generateLink = newTab =>
        generateRedirectPath({ ...location, queryParams: { [name]: newTab } });

      const currentTabDetails = tabs.find(tab => tab.value === currentTab);

      return (
        <>
          {type === 'carousel' && (
            <TabCarousel
              currentTab={currentTab}
              generateLink={generateLink}
              {...rest}
            />
          )}
          {type === 'dropdown' && (
            <TabDropdown
              currentTab={currentTab}
              generateLink={generateLink}
              name={name}
              tabs={tabs}
              {...rest}
            />
          )}
          {type === 'table' && (
            <TabTable
              currentTab={currentTab}
              generateLink={generateLink}
              {...rest}
            />
          )}
          {type === 'tabs' && (
            <TabLinks
              currentTab={currentTab}
              generateLink={generateLink}
              tabs={tabs}
              {...rest}
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
  name: PropTypes.string.isRequired,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      render: PropTypes.func.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  type: PropTypes.oneOf(['carousel', 'dropdown', 'table', 'tabs']),
};

Tabs.defaultProps = {
  defaultTab: null,
  type: 'tabs',
};

export default Tabs;
