import Box from '@spraoi/base/Box';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Group } from '@vx/group';
import { LinkHorizontal } from '@vx/shape';
import { ParentSize } from '@vx/responsive';
import { Text } from '@vx/text';
import { ThemeContext } from 'styled-components';
import { Tree } from '@vx/hierarchy';
import { hierarchy } from 'd3-hierarchy';
import calculateHeight from './utilities/calculate-height';
import findVertexMaxWidth from './utilities/find-vertex-max-width';
import {
  HIGHLIGHTED_VERTEX_BG_HEIGHT,
  VERTEX_BG_HEIGHT,
  VERTEX_BG_PX,
} from './utilities/constants';

const LineageChart = ({ data, highlightEdge, onVertexClick }) => {
  const theme = useContext(ThemeContext);
  const dataHierarchy = hierarchy(data);
  const vertexMaxWidth = findVertexMaxWidth(data);

  return (
    <Box
      sx={{
        height: calculateHeight(data, VERTEX_BG_HEIGHT),
        width: `${dataHierarchy.height *
          (vertexMaxWidth + VERTEX_BG_PX * 2 + 150)}px`,
      }}
    >
      <ParentSize>
        {({ height, width }) => (
          <svg height={height} width={width}>
            <Tree
              root={dataHierarchy}
              size={[height, width - VERTEX_BG_PX * 2 - vertexMaxWidth]}
            >
              {tree => (
                <Group left={VERTEX_BG_PX} top={0}>
                  {tree.links().map((link, i) => (
                    <LinkHorizontal
                      key={`link-${i}`}
                      data={link}
                      fill="none"
                      stroke={theme.colors.border}
                      strokeWidth="1"
                    />
                  ))}
                  {tree.descendants().map((node, i) => {
                    if (node.data.isEdge) {
                      return (
                        <Group key={`tree-${i}`} left={node.y} top={node.x}>
                          <rect
                            fill={theme.colors.white}
                            height={VERTEX_BG_HEIGHT}
                            rx={theme.radii[1]}
                            width={node.data.width + VERTEX_BG_PX * 2}
                            x={-VERTEX_BG_PX}
                            y={-VERTEX_BG_HEIGHT / 2}
                          />
                          <Text
                            fill={theme.colors.text.subtle}
                            fontSize={theme.fontSizes[2]}
                            verticalAnchor="middle"
                          >
                            {node.data.name}
                          </Text>
                        </Group>
                      );
                    }

                    if (
                      highlightEdge
                        ? highlightEdge === node.data.id
                        : node.depth === 0
                    ) {
                      return (
                        <Group key={`tree-${i}`} left={node.y} top={node.x}>
                          <rect
                            fill={theme.colors.accent}
                            height={HIGHLIGHTED_VERTEX_BG_HEIGHT}
                            rx={theme.radii[0]}
                            width={node.data.width + VERTEX_BG_PX * 2}
                            x={-VERTEX_BG_PX}
                            y={-HIGHLIGHTED_VERTEX_BG_HEIGHT / 2}
                          />
                          <Text
                            cursor="pointer"
                            fill={theme.colors.white}
                            fontSize={theme.fontSizes[2]}
                            onClick={() => onVertexClick(node.data)}
                            verticalAnchor="middle"
                          >
                            {node.data.name}
                          </Text>
                        </Group>
                      );
                    }

                    return (
                      <Group key={`tree-${i}`} left={node.y} top={node.x}>
                        <rect
                          fill={theme.colors.white}
                          height={VERTEX_BG_HEIGHT}
                          rx={theme.radii[1]}
                          width={node.data.width + VERTEX_BG_PX * 2}
                          x={-VERTEX_BG_PX}
                          y={-VERTEX_BG_HEIGHT / 2}
                        />
                        <Text
                          cursor="pointer"
                          fill={theme.colors.text.link}
                          fontSize={theme.fontSizes[2]}
                          onClick={() => onVertexClick(node.data)}
                          verticalAnchor="middle"
                        >
                          {node.data.name}
                        </Text>
                      </Group>
                    );
                  })}
                </Group>
              )}
            </Tree>
          </svg>
        )}
      </ParentSize>
    </Box>
  );
};

LineageChart.propTypes = {
  data: PropTypes.shape({
    children: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    isEdge: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
  }).isRequired,
  highlightEdge: PropTypes.string,
  onVertexClick: PropTypes.func.isRequired,
};

LineageChart.defaultProps = {
  highlightEdge: null,
};

export default LineageChart;
