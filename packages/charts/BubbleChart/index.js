import Box from '@spraoi/base/Box';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Group } from '@vx/group';
import { Pack } from '@vx/hierarchy';
import { ParentSize } from '@vx/responsive';
import { ThemeContext } from 'styled-components';
import { hierarchy } from 'd3-hierarchy';
import OrdinalLegend from '../OrdinalLegend';

const BubbleChart = ({
  colors,
  data,
  labelAccessor,
  margin,
  valueAccessor,
}) => {
  const theme = useContext(ThemeContext);

  return (
    <ParentSize>
      {({ height, width }) => {
        const xMax = width - margin.left - margin.right;
        const yMax = height - margin.top - margin.bottom;

        const pack = {
          children: [{ children: data.filter(d => d.value !== 0) }].concat(
            data.filter(d => d.value === 0)
          ),
        };

        const packData = hierarchy(pack)
          .sum(valueAccessor)
          .sort((a, b) => -(a.value - b.value));

        return (
          <>
            <svg height={height} width={width}>
              <Pack root={packData} size={[xMax, yMax]}>
                {pack => (
                  <Group left={margin.left} top={margin.top}>
                    {pack
                      .descendants()
                      .slice(2)
                      .map((circle, i) => (
                        <g key={`circle-${i}`}>
                          <circle
                            cx={circle.x}
                            cy={circle.y}
                            fill={(colors || theme.colors.visualizations)[i]}
                            r={circle.r}
                          />
                          {circle.r >= 3 && (
                            <text
                              dy=".33em"
                              fill={theme.colors.grays[1]}
                              fontSize={theme.fontSizes[3]}
                              fontWeight={theme.fontWeights.bold}
                              textAnchor="middle"
                              x={circle.x}
                              y={circle.y}
                            >
                              {circle.data.value}
                            </text>
                          )}
                        </g>
                      ))}
                  </Group>
                )}
              </Pack>
            </svg>
            <Box sx={{ position: 'absolute', top: 5 }}>
              <OrdinalLegend
                colors={colors}
                data={data}
                labelAccessor={labelAccessor}
              />
            </Box>
          </>
        );
      }}
    </ParentSize>
  );
};

BubbleChart.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.string),
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  labelAccessor: PropTypes.func.isRequired,
  margin: PropTypes.shape({
    bottom: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
    right: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
  }).isRequired,
  valueAccessor: PropTypes.func.isRequired,
};

BubbleChart.defaultProps = {
  colors: null,
};

export default BubbleChart;
