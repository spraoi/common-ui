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
  text-transform: ${p => p.transformCase};
  text-decoration: none;

  &::before {
    content: ${p => `'${p.separator}'`};
    margin-right: ${p => p.theme.space[4]};
    color: ${p => p.theme.colors.text.primary};
  }

  &:last-of-type {
    color: ${p => p.theme.colors.accent};
  }
`;

const Breadcrumbs = ({ crumbs, separator, transformCase, ...rest }) => (
  <Box display="flex" py="4" {...rest}>
    {crumbs.map((crumb, i) => (
      <Crumb
        key={i}
        link={crumb.path}
        separator={separator}
        simple
        transformCase={transformCase}
      >
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
  separator: PropTypes.string,
  transformCase: PropTypes.string,
};

Breadcrumbs.defaultProps = {
  separator: '/',
  transformCase: 'uppercase',
};

export default Breadcrumbs;
