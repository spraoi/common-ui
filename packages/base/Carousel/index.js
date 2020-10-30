import PropTypes from 'prop-types';
import React, { useState } from 'react';

// NOTE: if this component no longer uses this library:
// be sure to remove the stylesheet import in base/App
import ReactCarousel from '@brainhubeu/react-carousel';

import { ParentSize } from '@vx/responsive';
import { createGlobalStyle } from 'styled-components';
import Box from '../Box';

const GlobalStyle = createGlobalStyle`
  .BrainhubCarousel {
    position: relative;
  }

  .BrainhubCarousel__trackContainer {
    border-radius: ${(p) => p.theme.radii[2]};
  }

  .BrainhubCarousel__customArrows {
    position: absolute;
    z-index: ${(p) => p.theme.zIndices[0]};
  }

  .BrainhubCarousel__custom-arrowRight {
    right: 0;
  }
`;

const Carousel = ({
  activeSlideIndex,
  itemWidth,
  offset,
  offsetContent,
  onSlideClick,
  renderArrowLeft,
  renderArrowRight,
  slides,
  slideSx,
  ...rest
}) => {
  const [value, setValue] = useState(0);

  return (
    <>
      <GlobalStyle />
      <ParentSize>
        {({ width }) => {
          const slidesPerPage = Math.floor(width / itemWidth) - 1;
          const previousPage = Math.max(value - 1, 0);
          const overflow = slides.length / slidesPerPage;
          const availablePages = overflow === 1 ? 0 : Math.floor(overflow);
          const nextPage = Math.min(value + 1, availablePages);

          return (
            <Box
              arrowLeft={renderArrowLeft({
                disabled: value === previousPage,
                onClick: () => setValue(previousPage),
              })}
              arrowRight={renderArrowRight({
                disabled: value === nextPage,
                onClick: () => setValue(nextPage),
              })}
              as={ReactCarousel}
              draggable={false}
              itemWidth={itemWidth}
              onChange={setValue}
              value={value}
              {...rest}
            >
              {slides.map((slide, i) => (
                <Box
                  key={`slide-${i}`}
                  alignItems="center"
                  display="flex"
                  width="100%"
                >
                  <Box
                    onClick={() => onSlideClick(i)}
                    sx={{
                      '&:hover': {
                        boxShadow: (theme) =>
                          onSlideClick
                            ? `0 0 0 2px ${theme.colors.accent} inset`
                            : null,
                      },
                      bg: 'white',
                      borderRadius: 2,
                      boxShadow: (theme) =>
                        activeSlideIndex === i
                          ? `0 0 0 2px ${theme.colors.accent} inset`
                          : null,
                      cursor: onSlideClick ? 'pointer' : 'default',
                      p: 5,
                      textAlign: 'center',
                      transition: 'box-shadow 0.2s',
                      width: '100%',
                      ...slideSx,
                    }}
                  >
                    {slide}
                  </Box>
                  <Box
                    alignItems="center"
                    display="flex"
                    justifyContent="center"
                    width={offset}
                  >
                    {offsetContent && i < slides.length - 1
                      ? offsetContent
                      : ' '}
                  </Box>
                </Box>
              ))}
            </Box>
          );
        }}
      </ParentSize>
    </>
  );
};

Carousel.propTypes = {
  activeSlideIndex: PropTypes.number,
  itemWidth: PropTypes.number.isRequired,
  offset: PropTypes.number.isRequired,
  offsetContent: PropTypes.node,
  onSlideClick: PropTypes.func,
  renderArrowLeft: PropTypes.func.isRequired,
  renderArrowRight: PropTypes.func.isRequired,
  slides: PropTypes.arrayOf(PropTypes.node).isRequired,
  slideSx: PropTypes.shape({}),
};

Carousel.defaultProps = {
  activeSlideIndex: null,
  offsetContent: null,
  onSlideClick: null,
  slideSx: {},
};

export default Carousel;
