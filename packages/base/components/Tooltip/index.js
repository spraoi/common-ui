import PropTypes from 'prop-types';
import React from 'react';
import ReactTooltip from 'react-tooltip';
import Box from '../Box';

class Tooltip extends React.Component {
  componentDidUpdate() {
    ReactTooltip.rebuild();
  }

  render() {
    const {
      children,
      content,
      id,
      disable,
      showDataTip,
      isMultiple,
      maxWidth,
      maxHeight,
      place,
      sx,
      themeType,
      ...rest
    } = this.props;

    const randomId = Math.random()
      .toString(36)
      .substring(7);

    return (
      <>
        {showDataTip && (
          <Box
            data-delay-hide={200}
            data-for={isMultiple ? id : `tooltip_${randomId}`}
            data-html
            data-tip={`<div class="tooltipContentWrapper">${content}</div>`}
            data-tip-disable={disable}
            {...rest}
          >
            {children}
          </Box>
        )}
        <Box
          as={ReactTooltip}
          id={isMultiple ? id : `tooltip_${randomId}`}
          maxHeight={maxHeight}
          maxWidth={maxWidth}
          place={place}
          sx={{
            '.tooltipContentWrapper': {
              '&::-webkit-scrollbar': {
                width: '4px',
              },
              '&::-webkit-scrollbar-thumb': {
                background: p => p.colors.white,
                borderRadius: p => p.radii[0],
              },
              '&::-webkit-scrollbar-track': {
                boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.3)',
              },
              display: 'flex',
              flexWrap: 'wrap',
              fontWeight: p => p.fontWeights.light,
              margin: '0 -10px',
              maxHeight: '100%',
              overflow: 'auto',
              wordBreak: 'break-word',
            },
            display: 'flex',
            flexDirection: 'column',
            pointerEvents: isMultiple ? 'none' : 'auto',
            ...sx,
          }}
          type={themeType}
          {...rest}
        />
      </>
    );
  }
}

Tooltip.propTypes = {
  children: PropTypes.node,
  content: PropTypes.node,
  disable: PropTypes.bool,
  id: PropTypes.string,
  isMultiple: PropTypes.bool,
  maxHeight: PropTypes.string,
  maxWidth: PropTypes.string,
  place: PropTypes.string,
  showDataTip: PropTypes.bool,
  sx: PropTypes.shape({}),
  themeType: PropTypes.string,
};

Tooltip.defaultProps = {
  children: null,
  content: '',
  disable: false,
  id: 'graph_tooltip',
  isMultiple: false,
  maxHeight: '202px',
  maxWidth: '60ch',
  place: 'top',
  showDataTip: true,
  sx: {},
  themeType: 'dark',
};

export default Tooltip;
