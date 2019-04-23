import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import Box from '../Box';
import Button from '../Button';

const Crumb = styled(Button)`
  margin-right: ${p => p.theme.space.sm};
  color: ${p => p.theme.colors.textSubtle};
  font-size: ${p => p.theme.fontSizes.sm};
  letter-spacing: ${p => p.theme.letterSpacings.sm};
  text-transform: uppercase;
  text-decoration: none;

  &::before {
    content: '/';
    margin-right: ${p => p.theme.space.sm};
    color: ${p => p.theme.colors.textPrimary};
  }

  &:last-of-type {
    color: ${p => p.theme.colors.accent};
  }
`;

const Breadcrumbs = ({ crumbs, ...rest }) => (
  <Box display="flex" {...rest}>
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
