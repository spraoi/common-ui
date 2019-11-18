import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import Tooltip from '@spraoi/base/Tooltip';
import { AxisBottom, AxisLeft } from '@vx/axis';
import { Bar } from '@vx/shape';
import { GridColumns } from '@vx/grid';
import { Group } from '@vx/group';
import { ParentSize } from '@vx/responsive';
import { ThemeContext } from 'styled-components';
import { scaleBand, scaleLinear } from '@vx/scale';
import numTicksForWidth from './utilities/num-ticks-for-width';
import { BAR_PADDING } from './utilities/constants';

const HorizontalBarChart = ({ data, margin, xAccessor, yAccessor }) => {
  const theme = useContext(ThemeContext);

  return (
    <ParentSize>
      {({ height, width }) => {
        const xMax = width - margin.left - margin.right;
        const yMax = height - margin.top - margin.bottom;

        const xScale = scaleLinear({
          domain: [0, Math.max(...data.map(xAccessor))],
          rangeRound: [0, xMax],
        });

        const yScale = scaleBand({
          domain: data.map(yAccessor),
          padding: BAR_PADDING,
          rangeRound: [0, yMax],
        });

        return (
          <>
            <svg height={height} width={width}>
              <GridColumns
                height={yMax}
                left={margin.left}
                numTicks={numTicksForWidth(width)}
                scale={xScale}
                stroke={theme.colors.grays[1]}
                top={margin.top}
                width={xMax}
              />
              <Group left={margin.left} top={margin.top}>
                {data.map((d, i) => (
                  <Bar
                    key={`bar-${i}`}
                    data-for="chart"
                    data-tip={d.value}
                    fill={theme.colors.visualizations[0]}
                    height={yScale.bandwidth()}
                    rx={theme.radii[0]}
                    width={Math.max(0, xScale(xAccessor(d)))}
                    x={0}
                    y={yScale(yAccessor(d))}
                  />
                ))}
                <AxisLeft
                  hideAxisLine
                  hideTicks
                  scale={yScale}
                  stroke={theme.colors.grays[1]}
                  tickLabelProps={() => ({
                    dy: '0.33em',
                    fill: theme.colors.textSubtle,
                    fontSize: theme.fontSizes[1],
                    textAnchor: 'end',
                  })}
                />
                <AxisBottom
                  scale={xScale}
                  stroke={theme.colors.grays[1]}
                  tickLabelProps={() => ({
                    dy: '0.33em',
                    fill: theme.colors.textSubtle,
                    fontSize: theme.fontSizes[1],
                    textAnchor: 'middle',
                    y: 0,
                  })}
                  tickStroke={theme.colors.grays[1]}
                  top={yMax}
                />
              </Group>
            </svg>
            <Tooltip id="chart" />
          </>
        );
      }}
    </ParentSize>
  );
};

HorizontalBarChart.propTypes = {
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

export default HorizontalBarChart;
