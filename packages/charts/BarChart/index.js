import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { TooltipBox } from '@spraoi/base/Tooltip';
import Spinner from '@spraoi/base/Spinner';
import { AxisBottom, AxisLeft } from '@vx/axis';
import { Bar, Line } from '@vx/shape';
import { GridColumns, GridRows } from '@vx/grid';
import { Group } from '@vx/group';
import { ParentSize } from '@vx/responsive';
import { ThemeContext } from 'styled-components';
import { scaleBand, scaleLinear } from '@vx/scale';
import { BAR_PADDING } from './utilities/constants';

const BarChart = ({
  data,
  loading,
  margin,
  xAccessor,
  xAxisProps,
  yAccessor,
  yAxisProps,
}) => {
  const theme = useContext(ThemeContext);

  return (
    <ParentSize>
      {({ height, width }) => {
        const xMax = width - margin.left - margin.right;
        const yMax = height - margin.top - margin.bottom;
        const maxDataValue = Math.max(...data.map(yAccessor));
        const yScale = scaleLinear({
          domain: [0, maxDataValue || 1],
          nice: true,
          rangeRound: [yMax, 0],
        });

        const xScale = scaleBand({
          domain: data.map(xAccessor),
          nice: true,
          padding: BAR_PADDING,
          rangeRound: [0, xMax],
        });

        return loading ? (
          <Spinner />
        ) : (
          <>
            <svg height={height} width={width}>
              <GridColumns
                height={yMax}
                left={margin.left}
                offset={xScale.bandwidth() / 2}
                scale={xScale}
                stroke={theme.colors.grays[1]}
                strokeOpacity={0.1}
                top={margin.top}
                width={xMax}
              />
              <GridRows
                height={yMax}
                left={margin.left}
                scale={yScale}
                stroke={theme.colors.grays[1]}
                strokeOpacity={0.1}
                top={margin.top}
                width={xMax}
              />
              <Group left={margin.left} top={margin.top}>
                {data.map((d, i) => {
                  return (
                    <Bar
                      key={`bar-${i}`}
                      data-for="bar-chart"
                      data-tip={d.value}
                      fill={theme.colors.visualizations[0]}
                      height={yMax - yScale(yAccessor(d))}
                      rx={theme.radii[0]}
                      width={xScale.bandwidth()}
                      x={xScale(xAccessor(d))}
                      y={yMax - (yMax - yScale(yAccessor(d)))}
                    />
                  );
                })}
                <AxisLeft
                  label={yAxisProps.label}
                  scale={yScale}
                  stroke={theme.colors.grays[1]}
                >
                  {(axis) => {
                    const axisCenter =
                      (axis.axisFromPoint.y - axis.axisToPoint.y) / 2;
                    return (
                      <g className="my-custom-bottom-axis">
                        {!yAxisProps.hideAxisLine && (
                          <Line
                            from={axis.axisFromPoint}
                            stroke={theme.colors.textSubtle}
                            strokeWidth={yAxisProps.strokeWidth}
                            style={{ pointerEvents: 'none' }}
                            to={axis.axisToPoint}
                          />
                        )}
                        {axis.ticks.map((tick, i) => {
                          const tickX =
                            tick.to.x -
                            axis.tickLength -
                            yAxisProps.anchorMargin;
                          const tickY = tick.to.y;
                          return (
                            <Group key={`vx-tick-${tick.value}-${i}`}>
                              {!yAxisProps.hideTicks && (
                                <Line
                                  from={tick.from}
                                  stroke={theme.colors.textSubtle}
                                  strokeWidth={yAxisProps.strokeWidth}
                                  style={{ pointerEvents: 'none' }}
                                  to={tick.to}
                                />
                              )}
                              {(maxDataValue || !i) && (
                                <text
                                  fill={theme.colors.textSubtle}
                                  fontSize={theme.fontSizes[1]}
                                  textAnchor={yAxisProps.anchorPosition}
                                  transform={`translate(${tickX}, ${tickY}) rotate(${yAxisProps.rotateAnchorDegree})`}
                                >
                                  {tick.formattedValue}
                                </text>
                              )}
                            </Group>
                          );
                        })}
                        <text
                          fontSize={theme.fontSizes[1]}
                          textAnchor="middle"
                          transform={`translate(-${
                            margin.left - 10
                          }, ${axisCenter}) rotate(${
                            yAxisProps.rotateLabelDegree
                          })`}
                        >
                          {axis.label}
                        </text>
                      </g>
                    );
                  }}
                </AxisLeft>
                <AxisBottom
                  label={xAxisProps.label}
                  scale={xScale}
                  stroke={theme.colors.grays[1]}
                  top={yMax}
                >
                  {(axis) => {
                    const axisCenter =
                      (axis.axisToPoint.x - axis.axisFromPoint.x) / 2;
                    return (
                      <g className="my-custom-bottom-axis">
                        {!xAxisProps.hideAxisLine && (
                          <Line
                            from={axis.axisFromPoint}
                            stroke={theme.colors.textSubtle}
                            strokeWidth={xAxisProps.strokeWidth}
                            style={{ pointerEvents: 'none' }}
                            to={axis.axisToPoint}
                          />
                        )}
                        {axis.ticks.map((tick, i) => {
                          const tickX = tick.to.x;
                          const tickY =
                            tick.to.y +
                            axis.tickLength +
                            xAxisProps.anchorMargin;
                          return (
                            <Group key={`vx-tick-${tick.value}-${i}`}>
                              {!xAxisProps.hideTicks && (
                                <Line
                                  from={tick.from}
                                  stroke={theme.colors.textSubtle}
                                  strokeWidth={xAxisProps.strokeWidth}
                                  style={{ pointerEvents: 'none' }}
                                  to={tick.to}
                                />
                              )}
                              <text
                                fill={theme.colors.textSubtle}
                                fontSize={theme.fontSizes[1]}
                                textAnchor={xAxisProps.anchorPosition}
                                transform={`translate(${tickX}, ${tickY}) rotate(${xAxisProps.rotateAnchorDegree})`}
                              >
                                {tick.formattedValue}
                              </text>
                            </Group>
                          );
                        })}
                        <text
                          fontSize={theme.fontSizes[1]}
                          textAnchor="middle"
                          transform={`translate(${axisCenter}, ${margin.bottom}) rotate(${xAxisProps.rotateLabelDegree})`}
                        >
                          {axis.label}
                        </text>
                      </g>
                    );
                  }}
                </AxisBottom>
              </Group>
            </svg>
            <TooltipBox
              id="bar-chart"
              tooltipProps={{
                delayHide: 200,
                place: 'right',
              }}
            />
          </>
        );
      }}
    </ParentSize>
  );
};

BarChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  loading: PropTypes.bool.isRequired,
  margin: PropTypes.shape({
    bottom: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
    right: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
  }).isRequired,
  xAccessor: PropTypes.func.isRequired,
  xAxisProps: PropTypes.shape({
    anchorMargin: PropTypes.number,
    anchorPosition: PropTypes.string,
    hideAxisLine: PropTypes.bool,
    hideTicks: PropTypes.bool,
    label: PropTypes.string,
    rotateAnchorDegree: PropTypes.number,
    rotateLabelDegree: PropTypes.number,
    strokeWidth: PropTypes.number,
  }),
  yAccessor: PropTypes.func.isRequired,
  yAxisProps: PropTypes.shape({
    anchorMargin: PropTypes.number,
    anchorPosition: PropTypes.string,
    hideAxisLine: PropTypes.bool,
    hideTicks: PropTypes.bool,
    label: PropTypes.string,
    rotateAnchorDegree: PropTypes.number,
    rotateLabelDegree: PropTypes.number,
    strokeWidth: PropTypes.number,
  }),
};

BarChart.defaultProps = {
  xAxisProps: {
    anchorMargin: 5,
    anchorPosition: 'middle',
    hideAxisLine: false,
    hideTicks: false,
    label: '',
    rotateAnchorDegree: 0,
    rotateLabelDegree: 0,
    strokeWidth: 0.5,
  },
  yAxisProps: {
    anchorMargin: 5,
    anchorPosition: 'middle',
    hideAxisLine: false,
    hideTicks: false,
    label: '',
    rotateAnchorDegree: 0,
    rotateLabelDegree: 0,
    strokeWidth: 0.5,
  },
};

export default BarChart;
