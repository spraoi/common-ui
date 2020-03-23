import Box from '@spraoi/base/Box';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { LegendItem, LegendLabel, LegendOrdinal } from '@vx/legend';
import { ThemeContext } from 'styled-components';
import { scaleOrdinal } from '@vx/scale';

const OrdinalLegend = ({ colors, data, labelAccessor, size }) => {
  const theme = useContext(ThemeContext);

  return (
    <LegendOrdinal
      scale={scaleOrdinal({
        domain: [...data.map((d) => labelAccessor(d))],
      })}
    >
      {(label) =>
        label.map((d, i) => (
          <Box key={`ordinal-legend-${i}`} as={LegendItem} pr={5}>
            <svg height={size} width={size}>
              <circle
                cx={size / 2}
                cy={size / 2}
                fill={(colors || theme.colors.visualizations)[i]}
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
                {d.datum}
              </Box>
            </Box>
          </Box>
        ))
      }
    </LegendOrdinal>
  );
};

OrdinalLegend.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.string),
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  labelAccessor: PropTypes.func.isRequired,
  size: PropTypes.number,
};

OrdinalLegend.defaultProps = {
  colors: null,
  size: 12,
};

export default OrdinalLegend;
