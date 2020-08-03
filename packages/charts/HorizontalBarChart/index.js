import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import Spinner from '@spraoi/base/Spinner';
import { AxisBottom, AxisLeft } from '@vx/axis';
import { Bar, BarStackHorizontal, Line } from '@vx/shape';
import { GridColumns, GridRows } from '@vx/grid';
import { Group } from '@vx/group';
import { ParentSize } from '@vx/responsive';
import { ThemeContext } from 'styled-components';
import { TooltipBox } from '@spraoi/base/Tooltip';
import { scaleBand, scaleLinear, scaleOrdinal } from '@vx/scale';
import { BAR_PADDING } from './utilities/constants';

const HorizontalBarChart = ({
  colors,
  data,
  loading,
  margin,
  name,
  stackKeys,
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
        const maxXValue = Math.max(...data.map(xAccessor));

        const xScale = scaleLinear({
          domain: [0, maxXValue],
          nice: true,
          rangeRound: [0, xMax],
        });

        const yScale = scaleBand({
          domain: data.map(yAccessor),
          nice: true,
          padding: BAR_PADDING,
          rangeRound: [0, yMax],
        });

        if (loading) return <Spinner />;

        return (
          <>
            <svg height={height} width={width}>
              <GridColumns
                height={yMax}
                left={margin.left}
                scale={xScale}
                stroke={theme.colors.grays[1]}
                strokeOpacity={0.1}
                top={margin.top}
                width={xMax}
              />
              <GridRows
                height={yMax}
                left={margin.left}
                offset={yScale.bandwidth() / 2}
                scale={yScale}
                stroke={theme.colors.grays[1]}
                strokeOpacity={0.1}
                top={margin.top}
                width={xMax}
              />
              <Group left={margin.left} top={margin.top}>
                {stackKeys ? (
                  <BarStackHorizontal
                    color={scaleOrdinal({
                      domain: stackKeys,
                      range: colors || theme.colors.visualizations,
                    })}
                    data={data}
                    height={yMax}
                    keys={stackKeys}
                    xScale={xScale}
                    y={yAccessor}
                    yScale={yScale}
                  >
                    {(stacks) =>
                      stacks.map((stack) =>
                        stack.bars.map((bar) => (
                          <rect
                            key={`stacked-bar-${stack.index}-${bar.index}`}
                            data-for={name}
                            data-tip={`${bar.key} - ${bar.bar.data[bar.key]}`}
                            fill={bar.color}
                            height={bar.height}
                            width={bar.width}
                            x={bar.x}
                            y={bar.y}
                          />
                        ))
                      )
                    }
                  </BarStackHorizontal>
                ) : (
                  data.map((d, i) => (
                    <Bar
                      key={`bar-${i}`}
                      data-for={name}
                      data-tip={d.value}
                      fill={colors || theme.colors.visualizations[0]}
                      height={yScale.bandwidth()}
                      rx={theme.radii[0]}
                      width={Math.max(0, xScale(xAccessor(d)))}
                      x={0}
                      y={yScale(yAccessor(d))}
                    />
                  ))
                )}
                <AxisLeft
                  label={yAxisProps.label}
                  scale={yScale}
                  stroke={theme.colors.grays[1]}
                >
                  {(axis) => {
                    const axisCenter =
                      (axis.axisToPoint.y - axis.axisFromPoint.y) / 2;

                    return (
                      <g>
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

                          const tickY = tick.to.y + 2;

                          return (
                            <Group key={`tick-${tick.value}-${i}`}>
                              {!yAxisProps.hideTicks && (
                                <Line
                                  from={tick.from}
                                  stroke={theme.colors.textSubtle}
                                  strokeWidth={yAxisProps.strokeWidth}
                                  style={{ pointerEvents: 'none' }}
                                  to={tick.to}
                                />
                              )}
                              <text
                                fill={theme.colors.textSubtle}
                                fontSize={theme.fontSizes[1]}
                                textAnchor={yAxisProps.anchorPosition}
                                transform={`translate(${tickX}, ${tickY}) rotate(${yAxisProps.rotateAnchorDegree})`}
                              >
                                {tick.formattedValue}
                              </text>
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
                      <g>
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
                            <Group key={`tick-${tick.value}-${i}`}>
                              {!xAxisProps.hideTicks && (
                                <Line
                                  from={tick.from}
                                  stroke={theme.colors.textSubtle}
                                  strokeWidth={xAxisProps.strokeWidth}
                                  style={{ pointerEvents: 'none' }}
                                  to={tick.to}
                                />
                              )}
                              {(maxXValue || !i) && (
                                <text
                                  fill={theme.colors.textSubtle}
                                  fontSize={theme.fontSizes[1]}
                                  textAnchor={xAxisProps.anchorPosition}
                                  transform={`translate(${tickX}, ${tickY}) rotate(${xAxisProps.rotateAnchorDegree})`}
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
            <TooltipBox id={name} />
          </>
        );
      }}
    </ParentSize>
  );
};

HorizontalBarChart.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.string),
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  loading: PropTypes.bool,
  margin: PropTypes.shape({
    bottom: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
    right: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
  }).isRequired,
  name: PropTypes.string,
  stackKeys: PropTypes.arrayOf(PropTypes.string),
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

HorizontalBarChart.defaultProps = {
  colors: null,
  loading: false,
  name: 'StackedHorizontalBarChart',
  stackKeys: null,
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

export default HorizontalBarChart;
