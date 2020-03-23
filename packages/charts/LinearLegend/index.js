import Box from '@spraoi/base/Box';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { LegendItem, LegendLabel, LegendLinear } from '@vx/legend';
import { ThemeContext } from 'styled-components';
import { format } from 'd3-format';
import { scaleLinear } from '@vx/scale';

const oneDecimalFormat = format('.1f');

const LinearLegend = ({ domain, range, size, steps }) => {
  const theme = useContext(ThemeContext);

  return (
    <LegendLinear
      labelFormat={(d, i) => (i % 2 === 0 ? oneDecimalFormat(d) : '')}
      scale={scaleLinear({ domain, range })}
      steps={steps}
    >
      {(labels) =>
        labels.map((label, i) => (
          <LegendItem key={`linear-legend-${i}`}>
            <svg height={size} width={size}>
              <circle
                cx={size / 2}
                cy={size / 2}
                fill={label.value}
                r={size / 2}
              />
            </svg>
            <Box as={LegendLabel}>
              <Box
                sx={{
                  color: 'text.subtle',
                  fontSize: theme.fontSizes[1],
                  ml: 2,
                }}
              >
                {label.text}
              </Box>
            </Box>
          </LegendItem>
        ))
      }
    </LegendLinear>
  );
};

LinearLegend.propTypes = {
  domain: PropTypes.arrayOf(PropTypes.number).isRequired,
  range: PropTypes.arrayOf(PropTypes.string).isRequired,
  size: PropTypes.number,
  steps: PropTypes.number,
};

LinearLegend.defaultProps = {
  size: 12,
  steps: 9,
};

export default LinearLegend;
