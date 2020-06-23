import React from 'react';
import PropTypes from 'prop-types';
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
  enableJumpToPage,
  leftButtonContent,
  offset,
  onPageClick,
  onNextClick,
  onPreviousClick,
  pageSize,
  pageTotal,
  rightButtonContent,
  total,
  totalJumpToPages,
  ...rest
}) => {
  const currentPage = Math.floor(offset / pageSize) + 1;
  const pagiBtns = [];

  if (enableJumpToPage) {
    const totalPages = Math.ceil(total / pageSize);
    const MID = Math.floor(totalJumpToPages / 2);

    let start = 1;
    let end = Math.min(totalJumpToPages, totalPages);

    if (currentPage > MID + 1) {
      end = Math.min(currentPage + MID - 1, totalPages);
      start = currentPage - MID;
      start = Math.max(1, Math.min(start, end - totalJumpToPages + 1));
    }

    for (let i = start; i <= end; i += 1) {
      pagiBtns.push(
        <Button
          key={i}
          onClick={() => {
            onPageClick(i - 1);
          }}
          px={2}
          simple
          sx={{
            '&:hover': { color: 'grays.5', textDecoration: 'underline' },
            color: currentPage === i ? 'grays.5' : 'grays.4',
          }}
        >
          {i}
        </Button>
      );
    }
  }

  return (
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
        onClick={() => {
          onPreviousClick();
        }}
        sx={paginationButtonSx}
      >
        {leftButtonContent}
      </Button>
      {enableJumpToPage && pageTotal > 0 && pagiBtns}
      <Button
        disabled={
          total
            ? offset + pageSize >= total
            : pageTotal === 0 || pageTotal % pageSize !== 0
        }
        onClick={() => {
          onNextClick();
        }}
        sx={paginationButtonSx}
      >
        {rightButtonContent}
      </Button>
    </Box>
  );
};

Paginator.propTypes = {
  enableJumpToPage: PropTypes.bool,
  leftButtonContent: PropTypes.node.isRequired,
  offset: PropTypes.number,
  onNextClick: PropTypes.func.isRequired,
  onPageClick: PropTypes.func,
  onPreviousClick: PropTypes.func.isRequired,
  pageSize: PropTypes.number,
  pageTotal: PropTypes.number.isRequired,
  rightButtonContent: PropTypes.node.isRequired,
  total: PropTypes.number,
  totalJumpToPages: PropTypes.number,
};

Paginator.defaultProps = {
  enableJumpToPage: false,
  offset: 0,
  onPageClick: () => {},
  pageSize: 10,
  total: null,
  totalJumpToPages: 10,
};

export default Paginator;
