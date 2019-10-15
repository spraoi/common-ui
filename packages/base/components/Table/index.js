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
import Spinner from '../Spinner';

const StyledTable = styled(ReactTable)`
  font-size: ${p => p.theme.fontSizes[2]};
  line-height: 1.4em;
  border-bottom: solid 1px ${p => p.theme.colors.grays[1]};
  border-collapse: collapse;

  @media (min-width: 641px) {
    border-bottom: solid 1px ${p => p.theme.colors.grays[1]};
  }
`;

const StyledThead = styled(Thead)`
  color: ${p => p.theme.colors.text.subtle};
  text-transform: uppercase;
  letter-spacing: ${p => p.theme.letterSpacings.md};
`;

const StyledTh = styled(Th)`
  padding-bottom: ${p => p.theme.space[4]};
  font-size: ${p => p.theme.fontSizes[1]};
  font-weight: ${p => p.theme.fontWeights.normal};
  text-align: left;
`;

const SortableTitle = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  &:after {
    content: '';
    flex: none;
    margin: -6px ${p => p.theme.space[3]} 0 ${p => p.theme.space[1]};
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
    margin-top: 4px;
    border-top-color: ${p => p.theme.colors.text.primary};
    border-bottom-color: transparent;
  }
`;

const StyledTr = styled(Tr)`
  /* !important to override react-super-responsive-table */
  border: solid 1px ${p => p.theme.colors.grays[1]} !important;
  border-bottom-style: none !important;

  @media (min-width: 641px) {
    border: none !important;
    border-bottom: solid 1px ${p => p.theme.colors.grays[1]} !important;
  }
`;

const StyledTd = styled(Td)`
  padding: ${p => p.theme.space[4]} ${p => p.theme.space[5]}
    ${p => p.theme.space[4]} 0;

  &:last-of-type {
    padding-right: 0;
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

const Table = ({
  expandLastColumn,
  header,
  isLoading,
  keyPrefix,
  onSortUpdate,
  orderBy,
  renderEmpty,
  rows,
  sortBy,
}) => (
  <StyledTable>
    {!!rows.length && (
      <StyledThead>
        <StyledTr>
          {header.map((item, headerIndex) => (
            <StyledTh key={keyPrefix + headerIndex}>
              {typeof item === 'string' ? (
                item
              ) : (
                <SortableTitle
                  className={item.value === sortBy ? orderBy : ''}
                  onClick={() =>
                    onSortUpdate(
                      item.value,
                      item.value === sortBy && orderBy === 'asc'
                        ? 'desc'
                        : 'asc'
                    )
                  }
                >
                  {item.label}
                </SortableTitle>
              )}
            </StyledTh>
          ))}
        </StyledTr>
      </StyledThead>
    )}
    <Tbody>
      {rows.length ? (
        rows.map((row, rowIndex) => (
          <StyledTr key={keyPrefix + rowIndex}>
            {row.map((cell, cellIndex) => (
              <StyledTd
                key={keyPrefix + cellIndex}
                colSpan={
                  expandLastColumn &&
                  cellIndex === row.length - 1 &&
                  header.length - row.length + 1
                }
              >
                {formatCell(cell)}
              </StyledTd>
            ))}
          </StyledTr>
        ))
      ) : (
        <StyledTr>
          <StyledTd colSpan={header.length}>
            {isLoading ? <Spinner /> : renderEmpty}
          </StyledTd>
        </StyledTr>
      )}
    </Tbody>
  </StyledTable>
);

Table.propTypes = {
  expandLastColumn: PropTypes.bool,
  header: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})])
  ).isRequired,
  isLoading: PropTypes.bool,
  keyPrefix: PropTypes.string,
  onSortUpdate: PropTypes.func,
  orderBy: PropTypes.oneOf(['asc', 'desc']),
  renderEmpty: PropTypes.node,
  rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.node)).isRequired,
  sortBy: PropTypes.string,
};

Table.defaultProps = {
  expandLastColumn: false,
  isLoading: false,
  keyPrefix: '',
  onSortUpdate: () => {},
  orderBy: 'asc',
  renderEmpty: 'No results.',
  sortBy: null,
};

export default Table;
