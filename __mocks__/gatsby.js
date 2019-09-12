import React from 'react';

const gatsby = jest.requireActual('gatsby');

module.exports = {
  ...gatsby,
  graphql: jest.fn(),
  Link: jest
    .fn()
    .mockImplementation(
      ({
        activeClassName,
        activeStyle,
        children,
        getProps,
        innerRef,
        partiallyActive,
        ref,
        replace,
        to,
        ...rest
      }) => (
        <a href={to} {...rest}>
          {children}
        </a>
      )
    ),
  StaticQuery: jest.fn(),
  useStaticQuery: jest.fn(),
};
