import PropTypes from 'prop-types';
import React from 'react';
import Box from '../Box';
import Button from '../Button';

const Breadcrumbs = ({ crumbs, crumbSx, navigate, separator, ...rest }) => (
  <Box display="flex" py="4" {...rest}>
    {crumbs.map((crumb, i) => (
      <Button
        key={i}
        link={crumb.path}
        onClick={navigate ? () => navigate(i) : navigate}
        separator={separator}
        simple
        sx={{
          '&::before': {
            color: 'text.primary',
            content: `'${separator}'`,
            mr: '4',
          },
          '&:last-of-type': {
            color: 'accent',
          },
          color: 'text.subtle',
          fontSize: '2',
          letterSpacing: '0',
          mr: '4',
          textDecoration: 'none',
          textTransform: 'uppercase',
          ...crumbSx,
        }}
      >
        {crumb.name}
      </Button>
    ))}
  </Box>
);

Breadcrumbs.crumbsType = PropTypes.arrayOf(
  PropTypes.shape({
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  })
);

Breadcrumbs.propTypes = {
  crumbs: Breadcrumbs.crumbsType.isRequired,
  crumbSx: PropTypes.shape({}),
  navigate: PropTypes.func,
  separator: PropTypes.string,
};

Breadcrumbs.defaultProps = {
  crumbSx: {},
  navigate: null,
  separator: '/',
};

export default Breadcrumbs;
