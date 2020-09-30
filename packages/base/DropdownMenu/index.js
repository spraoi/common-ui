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

  ${(p) =>
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

  a {
    color: inherit;
    text-decoration: inherit;
  }

  svg {
    color: ${(p) => p.theme.colors.accent};
  }

  &.highlighted {
    background: ${(p) => p.theme.colors.accent};
    color: ${(p) => p.theme.colors.white};

    svg {
      color: ${(p) => p.theme.colors.white};
    }
  }
`;

const StyledMenuItemChild = styled.div`
  padding: ${(p) => p.theme.space[2]} ${(p) => p.theme.space[5]};
  width: 100%;
`;

const DropdownMenu = ({
  button,
  chevron,
  dividerPositions,
  itemActions,
  items,
  menuZIndex,
  sx,
  ...rest
}) => {
  return (
    <StyledMenuButton
      chevron={chevron}
      menu={
        <Box
          alignItems="center"
          bg="white"
          display="flex"
          mt={3}
          pb={4}
          pt={4}
          sx={{ borderRadius: 1, boxShadow: 2, overflow: 'hidden', ...sx }}
          {...rest}
        >
          <MenuList>
            {items.map((item, i) => {
              const linkRef = React.createRef();

              return (
                <div key={i}>
                  {dividerPositions.includes(i) && <Box as="hr" my={4} />}
                  <StyledMenuItem
                    onItemChosen={(e) => {
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
      menuZIndex={menuZIndex}
    >
      {button}
    </StyledMenuButton>
  );
};

DropdownMenu.propTypes = {
  button: PropTypes.node.isRequired,
  chevron: PropTypes.bool,
  dividerPositions: PropTypes.arrayOf(PropTypes.number),
  itemActions: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.func, PropTypes.string])
  ).isRequired,
  items: PropTypes.arrayOf(PropTypes.node).isRequired,
  menuZIndex: PropTypes.number,
  sx: PropTypes.shape({}),
};

DropdownMenu.defaultProps = {
  chevron: false,
  dividerPositions: [],
  menuZIndex: null, // Defaults to null, so css can't be applied
  sx: {},
};

export default DropdownMenu;
