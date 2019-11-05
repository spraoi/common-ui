import PropTypes from 'prop-types';
import React from 'react';
import Box from '../../Box';
import Button from '../../Button';

const TabLinks = ({ currentTab, generateLink, sx, tabs }) => (
  <Box as="nav" sx={{ display: 'flex', flexWrap: 'wrap', mt: 6, ...sx }}>
    {tabs.map(tab => (
      <Button
        key={tab.value}
        link={generateLink(tab.value)}
        replace
        simple
        sx={{
          '&:hover': {
            textDecoration: currentTab === tab.value ? 'none' : 'underline',
          },
          bg: currentTab === tab.value ? 'grays.4' : 'transparent',
          borderRadius: 1,
          color: currentTab === tab.value ? 'white' : 'grays.4',
          display: 'inline-block',
          px: 6,
          py: 4,
        }}
      >
        {tab.label}
      </Button>
    ))}
  </Box>
);

TabLinks.propTypes = {
  currentTab: PropTypes.string.isRequired,
  generateLink: PropTypes.func.isRequired,
  sx: PropTypes.shape({}),
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
};

TabLinks.defaultProps = {
  sx: {},
};

export default TabLinks;
