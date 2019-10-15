import PropTypes from 'prop-types';
import React from 'react';
import Box from '../Box';
import Button from '../Button';

const paginationButtonSx = {
  '&:hover': { bg: 'grays.5' },
  bg: 'grays.4',
  color: 'white',
  height: '2.5rem',
  justifyContent: 'center',
  ml: 2,
  p: 0,
  width: '2.5rem',
};

const Paginator = ({
  leftButtonContent,
  offset,
  onNextClick,
  onPreviousClick,
  pageSize,
  pageTotal,
  rightButtonContent,
  total,
  ...rest
}) => (
  <Box
    alignItems="center"
    display="flex"
    justifyContent="flex-end"
    mt={5}
    {...rest}
  >
    {pageTotal > 0 && (
      <Box mr={3}>
        {offset + 1}&ndash;{offset + pageTotal}
        {total ? ` of ${total}` : ''}
      </Box>
    )}
    <Button
      disabled={offset === 0}
      onClick={onPreviousClick}
      sx={paginationButtonSx}
    >
      {leftButtonContent}
    </Button>
    <Button
      disabled={
        total
          ? offset + pageSize >= total
          : pageTotal === 0 || pageTotal % pageSize !== 0
      }
      onClick={onNextClick}
      sx={paginationButtonSx}
    >
      {rightButtonContent}
    </Button>
  </Box>
);

Paginator.propTypes = {
  leftButtonContent: PropTypes.node.isRequired,
  offset: PropTypes.number,
  onNextClick: PropTypes.func.isRequired,
  onPreviousClick: PropTypes.func.isRequired,
  pageSize: PropTypes.number,
  pageTotal: PropTypes.number.isRequired,
  rightButtonContent: PropTypes.node.isRequired,
  total: PropTypes.number,
};

Paginator.defaultProps = {
  offset: 0,
  pageSize: 10,
  total: null,
};

export default Paginator;
