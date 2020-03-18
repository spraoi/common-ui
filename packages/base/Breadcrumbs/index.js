import PropTypes from 'prop-types';
import React from 'react';
import Box from '../Box';
import Button from '../Button';

const Breadcrumbs = ({ crumbs, crumbSx, separator, ...rest }) => (
  <Box display="flex" py="4" {...rest}>
    {crumbs.map((crumb, i) => (
      <Button
        key={i}
        link={crumb.path}
        separator={separator}
        simple
        sx={{
          '&::before': {
            color: p => p.colors.text.primary,
            content: `'${separator}'`,
            mr: p => p.space[4],
          },
          '&:last-of-type': {
            color: p => p.colors.accent,
          },
          color: p => p.colors.text.subtle,
          fontSize: p => p.fontSizes[2],
          letterSpacing: p => p.letterSpacings[0],
          mr: p => p.space[4],
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
  separator: PropTypes.string,
};

Breadcrumbs.defaultProps = {
  crumbSx: {},
  separator: '/',
};

export default Breadcrumbs;
