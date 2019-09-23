import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import Box from '../Box';
import Button from '../Button';

const Crumb = styled(Button)`
  margin-right: ${p => p.theme.space[4]};
  color: ${p => p.theme.colors.text.subtle};
  font-size: ${p => p.theme.fontSizes[2]};
  letter-spacing: ${p => p.theme.letterSpacings[0]};
  text-transform: uppercase;
  text-decoration: none;

  &::before {
    content: '/';
    margin-right: ${p => p.theme.space[4]};
    color: ${p => p.theme.colors.text.primary};
  }

  &:last-of-type {
    color: ${p => p.theme.colors.accent};
  }
`;

const Breadcrumbs = ({ crumbs, ...rest }) => (
  <Box display="flex" py="4" {...rest}>
    {crumbs.map((crumb, i) => (
      <Crumb key={i} link={crumb.path} simple>
        {crumb.name}
      </Crumb>
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
};

export default Breadcrumbs;
