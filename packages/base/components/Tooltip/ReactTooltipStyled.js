import styled, { css } from 'styled-components';
import ReactTooltip from 'react-tooltip';

const ReactTooltipStyled = styled(ReactTooltip)`
  max-width: ${p => p.maxWidth};
  max-height: ${p => p.maxHeight};
  display: flex;
  flex-direction: column;
  pointer-events: ${p => p.pointer};
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
      border-radius: ${p => p.theme.radii[0]};
    }
  }
`;

export default ReactTooltipStyled;
