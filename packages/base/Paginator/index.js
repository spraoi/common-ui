import React, { useEffect, useState } from 'react';
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
  fullPagintation,
  leftButtonContent,
  offset,
  onPageClick,
  onNextClick,
  onPreviousClick,
  pageSize,
  pageTotal,
  rightButtonContent,
  total,
  ...rest
}) => {
  const [currPage, setCurrPage] = useState(1);
  const pagiBtns = [];

  useEffect(() => {
    setCurrPage(parseInt(offset / pageSize, 10) + 1);
  }, [offset]);

  if (fullPagintation) {
    const reminder = parseInt(total / pageSize, 10);
    const noOfPages =
      parseInt(total % pageSize, 10) === 0 ? reminder : reminder + 1;

    for (let i = 1; i <= noOfPages; i += 1) {
      pagiBtns.push(
        <Button
          key={i}
          onClick={() => {
            setCurrPage(i);
            onPageClick(i - 1);
          }}
          sx={{
            ...paginationButtonSx,
            bg: currPage === i ? 'grays.5' : 'grays.4',
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
          setCurrPage(currPage - 1);
          onPreviousClick();
        }}
        sx={paginationButtonSx}
      >
        {leftButtonContent}
      </Button>
      {fullPagintation && pageTotal > 0 && pagiBtns}
      <Button
        disabled={
          total
            ? offset + pageSize >= total
            : pageTotal === 0 || pageTotal % pageSize !== 0
        }
        onClick={() => {
          setCurrPage(currPage + 1);
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
  fullPagintation: PropTypes.bool,
  leftButtonContent: PropTypes.node.isRequired,
  offset: PropTypes.number,
  onNextClick: PropTypes.func.isRequired,
  onPageClick: PropTypes.func,
  onPreviousClick: PropTypes.func.isRequired,
  pageSize: PropTypes.number,
  pageTotal: PropTypes.number.isRequired,
  rightButtonContent: PropTypes.node.isRequired,
  total: PropTypes.number,
};

Paginator.defaultProps = {
  fullPagintation: false,
  offset: 0,
  onPageClick: () => {},
  pageSize: 10,
  total: null,
};

export default Paginator;
