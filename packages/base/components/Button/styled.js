import styled, { css } from 'styled-components';

export const StyledButton = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: ${p => p.theme.space.sm} ${p => p.theme.space.md};
  background-color: ${p => p.theme.colors.primary};
  border: 0;
  border-radius: ${p => p.theme.radii.normal};
  box-shadow: ${p => p.theme.boxShadows.md};
  transition: background-color ${p => p.theme.transitionSpeeds.normal};
  color: ${p => p.theme.colors.white};
  font-weight: ${p => p.theme.fontWeights.bold};
  letter-spacing: ${p => p.theme.letterSpacings.sm};
  text-transform: uppercase;
  cursor: pointer;

  &:hover {
    background-color: ${p => p.theme.colors.primaryLight};
  }

  @media (min-width: ${p => p.theme.breakpoints.md}) {
    display: inline-block;
    width: auto;
  }

  ${p =>
    p.secondary &&
    css`
      background-color: ${p => p.theme.colors.secondary};

      &:hover {
        background-color: ${p => p.theme.colors.secondaryLight};
      }
    `}

  ${p =>
    p.disabled &&
    css`
      opacity: 0.3;
      pointer-events: none;
    `}
`;

export const StyledChildren = styled.div`
  display: flex;
  align-items: center;
  height: ${p => p.theme.lineHeights.md};
`;
