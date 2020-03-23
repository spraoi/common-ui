import PropTypes from 'prop-types';
import React from 'react';
import Box from '../Box';
import Button from '../Button';

const Breadcrumbs = ({ crumbs, crumbSx, separator, ...rest }) => (
  <Box display="flex" py="4" {...rest}>
    {crumbs.map((crumb, i) => (
      <Button
        key={i}
        link={crumb.link}
        onClick={crumb.onClick ? () => crumb.onClick() : crumb.onClick}
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
    link: PropTypes.string,
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func,
  })
);

Breadcrumbs.propTypes = {
  crumbs: Breadcrumbs.crumbsType.isRequired,
  crumbSx: PropTypes.shape({}),
  separator: PropTypes.string,
};

Breadcrumbs.defaultProps = {
  crumbSx: {},
  separator: '/',
};

export default Breadcrumbs;
