import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styled from 'styled-components';
import Box from '../Box';
import Button from '../Button';
import Spinner from '../Spinner';

const SortableTitle = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  text-align: left;

  &:after {
    content: '';
    flex: none;
    margin: -4px ${(p) => p.theme.space[3]} 0;
    border: 5px solid transparent;
    border-bottom-color: ${(p) => p.theme.colors.text.primary};
    opacity: 0.4;
  }

  &:hover:after {
    color: ${(p) => p.theme.colors.primary};
  }

  &.asc:after,
  &.desc:after {
    opacity: 1;
    color: ${(p) => p.theme.colors.black};
  }

  &.desc:after {
    margin-top: 6px;
    border-top-color: ${(p) => p.theme.colors.text.primary};
    border-bottom-color: transparent;
  }
`;

const formatCell = (cell, cellKey, fullyVisibleCells, setFullyVisibleCells) => {
  if (React.isValidElement(cell)) {
    return cell;
  }

  if (Array.isArray(cell) || (typeof cell === 'object' && cell !== null)) {
    const json = JSON.stringify(cell, null, 2);
    const isFullyVisible = fullyVisibleCells.includes(cellKey);
    const cellSplit = json.split('\n');
    const visibleSplit = cellSplit.slice(0, isFullyVisible ? Infinity : 10);
    const visible = visibleSplit.join('\n');

    return (
      <>
        {(cellSplit.length > visibleSplit.length || isFullyVisible) && (
          <Button
            onClick={() =>
              setFullyVisibleCells(
                isFullyVisible
                  ? fullyVisibleCells.filter((c) => c !== cellKey)
                  : [...fullyVisibleCells, cellKey]
              )
            }
            simple
            sx={{ '&:hover': { textDecoration: 'underline' }, mb: 4 }}
          >
            {isFullyVisible ? 'Show less' : 'Show all'}
          </Button>
        )}
        <pre>{visible}</pre>
      </>
    );
  }

  return String(cell);
};

const Table = ({
  activeRowIndex,
  cellSx,
  expandLastColumn,
  stickyColumnPosition,
  header,
  isLoading,
  keyPrefix,
  limit,
  onRowClick,
  onSortUpdate,
  orderBy,
  renderEmpty,
  rows,
  sortBy,
  stickyColumn,
  tableProps,
  tableSx,
}) => {
  const [fullyVisibleCells, setFullyVisibleCells] = useState([]);
  const [rowsFullyVisible, setRowsFullyVisible] = useState(false);

  const fixedSx = {
    bg: 'inherit',
    boxShadow: (p) =>
      `${stickyColumnPosition === 'left' ? '1px' : '-1px'} 0 0 ${
        p.colors.grays[2]
      }`,
    position: 'sticky',
    [stickyColumnPosition]: 0,
    zIndex: 0,
  };

  const tdSx = {
    '&.fixed': fixedSx,
    px: 5,
    py: 4,
    ...cellSx,
  };

  return (
    <Box sx={{ overflowX: 'auto', width: '100%' }}>
      {limit !== Infinity && (
        <Button
          onClick={() => setRowsFullyVisible(!rowsFullyVisible)}
          simple
          sx={{ '&:hover': { textDecoration: 'underline' }, mb: 4 }}
        >
          {rowsFullyVisible ? 'Show less' : 'Show all'}
        </Button>
      )}
      <Box
        as="table"
        sx={{
          borderCollapse: 'collapse',
          borderRadius: 2,
          fontSize: 2,
          lineHeight: '1.4em',
          width: '100%',
          ...tableSx,
        }}
        {...tableProps}
      >
        {!!rows.length && (
          <thead>
            <Box
              as="tr"
              sx={{
                bg: 'white',
                borderBottomStyle: 'solid',
                borderColor: 'grays.2',
                borderWidth: '1px',
              }}
            >
              {header.map((item, headerIndex) => (
                <Box
                  key={keyPrefix + headerIndex}
                  as="th"
                  className={stickyColumn === headerIndex ? 'fixed' : null}
                  sx={{
                    '&.fixed': fixedSx,
                    fontSize: 2,
                    fontWeight: 'bold',
                    p: 5,
                    textAlign: 'left',
                  }}
                >
                  {typeof item === 'object' && item.value ? (
                    <Button
                      onClick={() =>
                        onSortUpdate(
                          item.value,
                          item.value === sortBy && orderBy === 'asc'
                            ? 'desc'
                            : 'asc'
                        )
                      }
                      simple
                      sx={{ color: 'text.primary' }}
                    >
                      <SortableTitle
                        className={item.value === sortBy ? orderBy : ''}
                      >
                        {item.label}
                      </SortableTitle>
                    </Button>
                  ) : (
                    item
                  )}
                </Box>
              ))}
            </Box>
          </thead>
        )}
        <tbody>
          {rows.length ? (
            rows
              .slice(0, rowsFullyVisible ? Infinity : limit)
              .map((row, rowIndex) => {
                const rowIsActive = rowIndex === activeRowIndex;

                const trSx = {
                  '&:hover': {
                    bg: onRowClick && !rowIsActive ? 'accentLight' : null,
                    color: onRowClick && !rowIsActive ? 'white' : null,
                  },
                  bg: rowIsActive ? 'accent' : 'white',
                  color: rowIsActive ? 'white' : 'text.subtle',
                  cursor: onRowClick ? 'pointer' : 'default',
                  transition: 'background 0.1s, color 0.1s',
                };

                return (
                  <Box
                    key={keyPrefix + rowIndex}
                    as="tr"
                    onClick={() => onRowClick && onRowClick(row, rowIndex)}
                    sx={{
                      '&:nth-child(even)': {
                        '&:hover': trSx['&:hover'],
                        bg: rowIsActive ? 'accent' : 'grays.0',
                        color: trSx.color,
                      },
                      ...trSx,
                    }}
                  >
                    {row.map((cell, cellIndex) => (
                      <Box
                        key={keyPrefix + cellIndex}
                        as="td"
                        className={stickyColumn === cellIndex ? 'fixed' : null}
                        colSpan={
                          expandLastColumn && cellIndex === row.length - 1
                            ? header.length - row.length + 1
                            : 1
                        }
                        sx={tdSx}
                      >
                        {formatCell(
                          cell,
                          keyPrefix + cellIndex,
                          fullyVisibleCells,
                          setFullyVisibleCells
                        )}
                      </Box>
                    ))}
                  </Box>
                );
              })
          ) : (
            <Box as="tr">
              <Box as="td" colSpan={header.length} sx={tdSx}>
                {isLoading ? <Spinner /> : renderEmpty}
              </Box>
            </Box>
          )}
        </tbody>
      </Box>
    </Box>
  );
};

Table.propTypes = {
  activeRowIndex: PropTypes.number,
  cellSx: PropTypes.shape({}),
  expandLastColumn: PropTypes.bool,
  header: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})])
  ).isRequired,
  isLoading: PropTypes.bool,
  keyPrefix: PropTypes.string,
  limit: PropTypes.number,
  onRowClick: PropTypes.func,
  onSortUpdate: PropTypes.func,
  orderBy: PropTypes.oneOf(['asc', 'desc']),
  renderEmpty: PropTypes.node,
  rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.node)).isRequired,
  sortBy: PropTypes.string,
  stickyColumn: PropTypes.number,
  stickyColumnPosition: PropTypes.oneOf(['left', 'right']),
  tableProps: PropTypes.shape({}),
  tableSx: PropTypes.shape({}),
};

Table.defaultProps = {
  activeRowIndex: null,
  cellSx: {},
  expandLastColumn: false,
  isLoading: false,
  keyPrefix: '',
  limit: Infinity,
  onRowClick: null,
  onSortUpdate: () => {},
  orderBy: 'asc',
  renderEmpty: 'No results.',
  sortBy: null,
  stickyColumn: null,
  stickyColumnPosition: 'left',
  tableProps: {},
  tableSx: {},
};

export default Table;
