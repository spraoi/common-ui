import PropTypes from 'prop-types';
import React from 'react';
import { navigate } from '@reach/router';
import Carousel from '../../Carousel';

const TabCarousel = ({ currentTab, generateLink, ...rest }) => (
  <Carousel
    activeSlideIndex={Number(currentTab)}
    onSlideClick={(index) => navigate(generateLink(index), { replace: true })}
    {...rest}
  />
);

TabCarousel.propTypes = {
  currentTab: PropTypes.string,
  generateLink: PropTypes.func.isRequired,
};

TabCarousel.defaultProps = {
  currentTab: null,
};

export default TabCarousel;
