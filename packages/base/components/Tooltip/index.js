import PropTypes from 'prop-types';
import React from 'react';

import { renderToStaticMarkup } from 'react-dom/server';
import ReactTooltip from 'react-tooltip';
import Box from '../Box';
import ReactTooltipStyled from './ReactTooltipStyled';

const getTags = string =>
  renderToStaticMarkup(
    string && string.split(',').map(item => <span className="tag">{item}</span>)
  );

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
      isGraphTooltip,
      maxWidth,
      maxHeight,
      place,
      tags,
      themeType,
      ...rest
    } = this.props;

    const randomId = Math.random()
      .toString(36)
      .substring(7);

    return (
      <>
        {!isGraphTooltip && (
          <Box
            data-delay-hide={200}
            data-for={`tooltip_${randomId}`}
            data-html
            data-tip={`<div>${tags ? getTags(content) : content}</div>`}
            data-tip-disable={disable}
            {...rest}
          >
            {children}
          </Box>
        )}
        <ReactTooltipStyled
          id={isGraphTooltip ? id : `tooltip_${randomId}`}
          maxHeight={maxHeight}
          maxWidth={maxWidth}
          place={place}
          pointer={isGraphTooltip ? 'none' : 'auto'}
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
  isGraphTooltip: PropTypes.bool,
  maxHeight: PropTypes.string,
  maxWidth: PropTypes.string,
  place: PropTypes.string,
  tags: PropTypes.bool,
  themeType: PropTypes.string,
};

Tooltip.defaultProps = {
  children: null,
  content: '',
  disable: false,
  id: 'graph_tooltip',
  isGraphTooltip: false,
  maxHeight: '202px',
  maxWidth: '60ch',
  place: 'top',
  tags: false,
  themeType: 'dark',
};

export default Tooltip;
