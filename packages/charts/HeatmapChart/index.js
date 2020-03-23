import Box from '@spraoi/base/Box';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import get from 'lodash/get';
import getTextWidth from '@spraoi/helpers/get-text-width';
import { AxisBottom, AxisLeft } from '@vx/axis';
import { Group } from '@vx/group';
import { HeatmapRect } from '@vx/heatmap';
import { Line } from '@vx/shape';
import { ParentSize } from '@vx/responsive';
import { ThemeContext } from 'styled-components';
import { scaleLinear, scaleBand } from '@vx/scale';
import ThresholdLegend from '../LinearLegend';

const HeatmapChart = ({ colors, data }) => {
  const theme = useContext(ThemeContext);

  const binsAccessor = (d) => d.bins;
  const countAccessor = (d) => d.count;
  const labelAccessor = (d) => d.label;

  const max = (data, value = (d) => d) => Math.max(...data.map(value));
  const min = (data, value = (d) => d) => Math.min(...data.map(value));
  const uniq = (arr) => Array.from([...new Set(arr)]);

  const reduceLabelWidth = (max, label) =>
    Math.max(
      max,
      getTextWidth(label, {
        fontFamily: theme.fonts.primary,
        fontSize: theme.fontSizes[1],
        fontWeight: theme.fontWeights.normal,
      })
    );

  const bucketSizeMax = max(data, (d) => binsAccessor(d).length);

  const color1 = get(colors, '[0]', theme.colors.visualizations[0]);
  const color2 = get(colors, '[1]', theme.colors.visualizations[1]);
  const colorMax = max(data, (d) => max(binsAccessor(d), countAccessor));
  const colorMin = min(data, (d) => min(binsAccessor(d), countAccessor));

  const labelMarginBuffer = 16;
  const legendMargin = 50;

  const xAxisDomain = uniq(
    data.reduce((acc, d) => [...acc, ...binsAccessor(d).map(labelAccessor)], [])
  );

  const yAxisDomain = data.map(labelAccessor);

  const margin = {
    bottom: yAxisDomain.reduce(reduceLabelWidth, 0) + labelMarginBuffer,
    left: xAxisDomain.reduce(reduceLabelWidth, 0) + labelMarginBuffer,
    right: legendMargin,
    top: 0,
  };

  return (
    <ParentSize>
      {({ width }) => {
        const size = width;
        const xGridSize = size - margin.right - margin.left;
        const yGridSize = size - margin.top - margin.bottom;
        const gridSize = Math.min(xGridSize, yGridSize);
        const binWidth = gridSize / data.length;

        return (
          <>
            <svg
              height={gridSize + margin.top + margin.bottom}
              width={gridSize + margin.right + margin.left}
            >
              <Group left={margin.left}>
                <HeatmapRect
                  binHeight={binWidth}
                  binWidth={binWidth}
                  colorScale={scaleLinear({
                    domain: [colorMin, colorMax],
                    range: [color1, color2],
                  })}
                  data={data}
                  gap={3}
                  xScale={scaleLinear({
                    domain: [0, data.length],
                    range: [0, gridSize],
                  })}
                  yScale={scaleLinear({
                    domain: [0, bucketSizeMax],
                    range: [gridSize, 0],
                  })}
                >
                  {(map) =>
                    map.map((bins) =>
                      bins.map((bin) => (
                        <rect
                          key={`heatmap-rect-${bin.row}-${bin.column}`}
                          fill={bin.color}
                          fillOpacity={bin.opacity}
                          height={bin.height}
                          width={bin.width}
                          x={bin.x}
                          y={bin.y - binWidth}
                        />
                      ))
                    )
                  }
                </HeatmapRect>
                <AxisLeft
                  hideAxisLine
                  scale={scaleBand({
                    domain: yAxisDomain,
                    range: [gridSize, 0],
                  })}
                  tickLabelProps={() => ({
                    dx: '-0.6em',
                    dy: '0.3em',
                    fill: theme.colors.textSubtle,
                    fontSize: theme.fontSizes[1],
                    textAnchor: 'end',
                  })}
                  tickStroke={theme.colors.grays[1]}
                />
                <AxisBottom
                  hideAxisLine
                  scale={scaleBand({
                    domain: xAxisDomain,
                    range: [0, gridSize],
                  })}
                  top={gridSize}
                >
                  {(axis) => (
                    <g>
                      {axis.ticks.map((tick, i) => (
                        <Group key={`tick-${tick.value}-${i}`}>
                          <Line
                            from={tick.from}
                            stroke={theme.colors.grays[1]}
                            to={tick.to}
                          />
                          <text
                            dy="0.25em"
                            fill={theme.colors.textSubtle}
                            fontSize={theme.fontSizes[1]}
                            textAnchor="end"
                            transform={`translate(${tick.to.x}, ${
                              tick.to.y + axis.tickLength
                            }) rotate(-90)`}
                          >
                            {tick.formattedValue}
                          </text>
                        </Group>
                      ))}
                    </g>
                  )}
                </AxisBottom>
              </Group>
            </svg>
            <Box sx={{ position: 'absolute', right: 0, top: 0 }}>
              <ThresholdLegend
                domain={[colorMin, colorMax]}
                range={[color1, color2]}
              />
            </Box>
          </>
        );
      }}
    </ParentSize>
  );
};

HeatmapChart.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.string),
  data: PropTypes.arrayOf(
    PropTypes.shape({
      bins: PropTypes.arrayOf(
        PropTypes.shape({
          count: PropTypes.number.isRequired,
          label: PropTypes.string.isRequired,
        })
      ).isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};

HeatmapChart.defaultProps = {
  colors: [],
};

export default HeatmapChart;
