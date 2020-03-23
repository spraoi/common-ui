import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Area, LinePath, Line } from '@vx/shape';
import { AxisLeft, AxisRight, AxisBottom } from '@vx/axis';
import { Grid } from '@vx/grid';
import { Group } from '@vx/group';
import { ParentSize } from '@vx/responsive';
import { ThemeContext } from 'styled-components';
import { curveBasis } from '@vx/curve';
import { scaleTime, scaleLinear } from '@vx/scale';
import numTicksForHeight from './utilities/num-ticks-for-height';
import numTicksForWidth from './utilities/num-ticks-for-width';

const LineChart = ({ data, margin, xAccessor, yAccessor }) => {
  const theme = useContext(ThemeContext);

  return (
    <ParentSize>
      {({ height, width }) => {
        const xMax = width - margin.left - margin.right;
        const yMax = height - margin.top - margin.bottom;
        const max = (arr, fn) => Math.max(...arr.map(fn));
        const min = (arr, fn) => Math.min(...arr.map(fn));
        const extent = (arr, fn) => [min(arr, fn), max(arr, fn)];
        const xScaleDomain = data.length ? extent(data, xAccessor) : [0, 0];

        const yScaleDomain = data.length
          ? [0, max(data, yAccessor) + yMax / 3]
          : [0, 0];

        const xScale = scaleTime({
          domain: xScaleDomain,
          range: [0, xMax],
        });

        const yScale = scaleLinear({
          domain: yScaleDomain,
          nice: true,
          range: [yMax, 0],
        });

        return (
          <svg height={height} width={width}>
            <Grid
              height={yMax}
              left={margin.left}
              numTicksColumns={numTicksForWidth(width)}
              numTicksRows={numTicksForHeight(height)}
              stroke={theme.colors.grays[1]}
              top={margin.top}
              width={xMax}
              xScale={xScale}
              yScale={yScale}
            />
            <Group left={margin.left} top={margin.top}>
              <Area
                curve={curveBasis}
                data={data}
                fill={theme.colors.accent}
                stroke="transparent"
                strokeWidth={2}
                x={(d) => xScale(xAccessor(d))}
                y0={() => yScale.range()[0]}
                y1={(d) => yScale(yAccessor(d))}
              />
              <LinePath
                curve={curveBasis}
                data={data}
                stroke="url('#linear')"
                strokeWidth={2}
                x={(d) => xScale(xAccessor(d))}
                y={(d) => yScale(yAccessor(d))}
              />
            </Group>
            <Group left={margin.left}>
              <AxisLeft
                hideZero
                left={0}
                numTicks={numTicksForHeight(height)}
                scale={yScale}
                stroke={theme.colors.grays[1]}
                tickLabelProps={() => ({
                  dx: '-0.25em',
                  dy: '0.25em',
                  fill: theme.colors.textSubtle,
                  fontSize: theme.fontSizes[1],
                  textAnchor: 'end',
                })}
                tickStroke={theme.colors.grays[1]}
                top={margin.top}
              />
              <AxisRight
                hideZero
                left={xMax}
                numTicks={numTicksForHeight(height)}
                scale={yScale}
                stroke={theme.colors.grays[1]}
                tickLabelProps={() => ({
                  dx: '0.25em',
                  dy: '0.25em',
                  fill: theme.colors.textSubtle,
                  fontSize: theme.fontSizes[1],
                  textAnchor: 'start',
                })}
                tickStroke={theme.colors.grays[1]}
                top={margin.top}
              />
              <AxisBottom
                numTicks={numTicksForWidth(width)}
                scale={xScale}
                top={height - margin.bottom}
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
                          fill={theme.colors.textSubtle}
                          fontSize={theme.fontSizes[1]}
                          textAnchor="middle"
                          transform={`translate(${tick.to.x}, ${
                            tick.to.y + 10 + axis.tickLength
                          }) rotate(45)`}
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
        );
      }}
    </ParentSize>
  );
};

LineChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  margin: PropTypes.shape({
    bottom: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
    right: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
  }).isRequired,
  xAccessor: PropTypes.func.isRequired,
  yAccessor: PropTypes.func.isRequired,
};

export default LineChart;
