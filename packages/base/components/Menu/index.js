import PropTypes from 'prop-types';
import React from 'react';
import styled, { css } from 'styled-components';
import { MenuButton, MenuItem, MenuList } from 'react-menu-list';
import { Link } from 'gatsby';
import Box from '../Box';

const StyledMenuButton = styled(MenuButton).attrs({
  openedClassName: 'open',
})`
  display: flex;
  align-items: center;

  ${p =>
    p.chevron &&
    css`
      padding-right: 1em;

      &::after {
        content: '';
        display: inline-block;
        position: relative;
        top: -0.12em;
        left: 0.55rem;
        width: 0.45em;
        height: 0.45em;
        border-style: solid;
        border-width: 1px 1px 0 0;
        transform: rotate(135deg);
        vertical-align: middle;
      }

      &.open::after {
        top: 0.18em;
        transform: rotate(-45deg);
      }
    `}
`;

const StyledMenuItem = styled(MenuItem).attrs({
  highlightedClassName: 'highlighted',
})`
  display: flex;
  align-items: center;
  padding: 0;
  cursor: pointer;
  user-select: none;

  &.highlighted {
    background: ${p => p.theme.colors.accent};
    color: ${p => p.theme.colors.white};
  }

  a {
    color: inherit;
    text-decoration: inherit;
  }
`;

const StyledMenuItemChild = styled.div`
  padding: ${p => p.theme.space.xxs} ${p => p.theme.space.md};
`;

const Menu = ({
  button,
  chevron,
  dividerPositions,
  heading,
  itemActions,
  items,
  ...rest
}) => {
  return (
    <Box {...rest}>
      <StyledMenuButton
        chevron={chevron}
        menu={
          <Box
            alignItems="center"
            bg="white"
            borderRadius="md"
            boxShadow="lg"
            display="flex"
            mt="xs"
            pb="sm"
            pt={heading ? '0' : 'sm'}
          >
            <MenuList>
              {heading && (
                <Box bg="gray1" color="textSubtle" fontSize="sm" mb="sm" p="md">
                  {heading}
                </Box>
              )}
              {items.map((item, i) => {
                const linkRef = React.createRef();

                return (
                  <div key={i}>
                    {dividerPositions.includes(i) && <Box as="hr" my="sm" />}
                    <StyledMenuItem
                      onItemChosen={e => {
                        if (typeof itemActions[i] === 'string') {
                          return e.byKeyboard
                            ? linkRef.current.click()
                            : () => {};
                        }

                        return itemActions[i](e);
                      }}
                    >
                      {typeof itemActions[i] === 'string' ? (
                        <StyledMenuItemChild
                          ref={linkRef}
                          as={Link}
                          to={itemActions[i]}
                        >
                          {item}
                        </StyledMenuItemChild>
                      ) : (
                        <StyledMenuItemChild>{item}</StyledMenuItemChild>
                      )}
                    </StyledMenuItem>
                  </div>
                );
              })}
            </MenuList>
          </Box>
        }
      >
        {button}
      </StyledMenuButton>
    </Box>
  );
};

Menu.propTypes = {
  button: PropTypes.node.isRequired,
  chevron: PropTypes.bool,
  dividerPositions: PropTypes.arrayOf(PropTypes.number),
  heading: PropTypes.string,
  itemActions: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.func, PropTypes.string])
  ).isRequired,
  items: PropTypes.arrayOf(PropTypes.node).isRequired,
};

Menu.defaultProps = {
  chevron: false,
  dividerPositions: [],
  heading: null,
};

export default Menu;
