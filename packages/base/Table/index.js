import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import {
  Table as ReactTable,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from 'react-super-responsive-table';
import Box from '../Box';
import Button from '../Button';
import Spinner from '../Spinner';

const SortableTitle = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  &:after {
    content: '';
    flex: none;
    margin: -4px ${p => p.theme.space[3]} 0;
    border: 5px solid transparent;
    border-bottom-color: ${p => p.theme.colors.text.primary};
    opacity: 0.4;
  }

  &:hover:after {
    color: ${p => p.theme.colors.primary};
  }

  &.asc:after,
  &.desc:after {
    opacity: 1;
    color: ${p => p.theme.colors.black};
  }

  &.desc:after {
    margin-top: 6px;
    border-top-color: ${p => p.theme.colors.text.primary};
    border-bottom-color: transparent;
  }
`;

const formatCell = cell => {
  if (React.isValidElement(cell)) {
    return cell;
  }

  if (Array.isArray(cell) || (typeof cell === 'object' && cell !== null)) {
    return <pre>{JSON.stringify(cell, null, 2)}</pre>;
  }

  return String(cell);
};

const tdSx = { px: 5, py: 4 };

const Table = ({
  activeRowIndex,
  expandLastColumn,
  header,
  isLoading,
  keyPrefix,
  onRowClick,
  onSortUpdate,
  orderBy,
  renderEmpty,
  rows,
  sortBy,
}) => (
  <Box
    as={ReactTable}
    sx={{
      borderCollapse: 'collapse',
      borderRadius: 2,
      fontSize: 2,
      lineHeight: '1.4em',
      overflow: 'hidden',
    }}
  >
    {!!rows.length && (
      <Thead>
        <Box
          as={Tr}
          sx={{
            borderBottomStyle: 'solid',
            borderColor: 'grays.2',
            borderWidth: '1px',
          }}
        >
          {header.map((item, headerIndex) => (
            <Box
              key={keyPrefix + headerIndex}
              as={Th}
              sx={{
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
      </Thead>
    )}
    <Tbody>
      {rows.length ? (
        rows.map((row, rowIndex) => {
          const rowIsActive = rowIndex === activeRowIndex;

          const trSx = {
            '&:hover': {
              bg: onRowClick && !rowIsActive ? 'accentLight' : null,
              color: onRowClick && !rowIsActive ? 'white' : null,
            },
            bg: rowIsActive ? 'accent' : 'transparent',
            color: rowIsActive ? 'white' : 'text.subtle',
            cursor: onRowClick ? 'pointer' : 'default',
            transition: 'background 0.1s, color 0.1s',
          };

          return (
            <Box
              key={keyPrefix + rowIndex}
              as={Tr}
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
                  as={Td}
                  colSpan={
                    expandLastColumn && cellIndex === row.length - 1
                      ? header.length - row.length + 1
                      : 1
                  }
                  sx={tdSx}
                >
                  {formatCell(cell)}
                </Box>
              ))}
            </Box>
          );
        })
      ) : (
        <Box as={Tr}>
          <Box as={Td} colSpan={header.length} sx={tdSx}>
            {isLoading ? <Spinner /> : renderEmpty}
          </Box>
        </Box>
      )}
    </Tbody>
  </Box>
);

Table.propTypes = {
  activeRowIndex: PropTypes.number,
  expandLastColumn: PropTypes.bool,
  header: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})])
  ).isRequired,
  isLoading: PropTypes.bool,
  keyPrefix: PropTypes.string,
  onRowClick: PropTypes.func,
  onSortUpdate: PropTypes.func,
  orderBy: PropTypes.oneOf(['asc', 'desc']),
  renderEmpty: PropTypes.node,
  rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.node)).isRequired,
  sortBy: PropTypes.string,
};

Table.defaultProps = {
  activeRowIndex: null,
  expandLastColumn: false,
  isLoading: false,
  keyPrefix: '',
  onRowClick: null,
  onSortUpdate: () => {},
  orderBy: 'asc',
  renderEmpty: 'No results.',
  sortBy: null,
};

export default Table;
