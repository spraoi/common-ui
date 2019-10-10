import styled, { css } from 'styled-components';
import ReactTooltip from 'react-tooltip';

const ReactTooltipStyled = styled(ReactTooltip)`
  max-width: ${p => p.maxWidth};
  max-height: ${p => p.maxHeight};
  display: flex;
  flex-direction: column;
  pointer-events: ${p => p.pointer};
  .graphTooltip {
    display: flex;
    text-align: center;
    font-size: ${p => p.theme.fontSizes.md};
    align-items: center;
    > * {
      display: inline-block;
      padding: 0 2px;
    }
    .highlight,
    .title {
      font-weight: ${p => p.theme.fontWeights.bold};
    }
    .subtitle {
      color: ${p => p.theme.colors.gray4};
      font-size: ${p => p.theme.fontSizes.sm};
    }
    &.light {
      color: ${p => p.theme.colors.primary};
    }
    .highlight {
      color: ${p => p.theme.colors.accent};
    }
    &.stacked {
      flex-direction: column;
      > * {
        width: 100%;
      }
    }
    &.right {
      text-align: right;
    }
  }
  > div {
    margin: 0 -10px;
    max-height: 100%;
    overflow: auto;
    word-break: break-word;
    display: flex;
    flex-wrap: wrap;

    &::-webkit-scrollbar {
      width: 4px;
    }

    &::-webkit-scrollbar-track {
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    }

    &::-webkit-scrollbar-thumb {
      background: white;
      border-radius: ${p => p.theme.radii.sm};
    }
  }

  .tag {
    ${p => css`
      border: 1px solid ${p.theme.colors.gray5};
      border-radius: ${p.theme.radii.md};
      display: inline-block;
      flex: auto;
      margin: 3px;
      padding: ${p.theme.space.xxxs} ${p.theme.space.xs};
      text-align: center;
    `}
  }
`;

export default ReactTooltipStyled;
