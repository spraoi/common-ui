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
  font-size: ${p => p.theme.fontSizes.sm};
  line-height: 1.4em;
  border-bottom: solid 1px ${p => p.theme.colors.border};
  border-collapse: collapse;

  @media (min-width: 641px) {
    border-bottom: solid 1px ${p => p.theme.colors.gray1};
  }
`;

const StyledThead = styled(Thead)`
  color: ${p => p.theme.colors.textSubtle};
  text-transform: uppercase;
  letter-spacing: ${p => p.theme.letterSpacings.md};
`;

const StyledTh = styled(Th)`
  padding-bottom: ${p => p.theme.space.sm};
  font-size: ${p => p.theme.fontSizes.xs};
  font-weight: ${p => p.theme.fontWeights.normal};
  text-align: left;
`;

const StyledTr = styled(Tr)`
  /* !important to override react-super-responsive-table */
  border: solid 1px ${p => p.theme.colors.border} !important;
  border-bottom-style: none !important;

  @media (min-width: 641px) {
    border: none !important;
    border-bottom: solid 1px ${p => p.theme.colors.gray1} !important;
  }
`;

const StyledTd = styled(Td)`
  padding: ${p => p.theme.space.sm} ${p => p.theme.space.md}
    ${p => p.theme.space.sm} 0;

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
  renderEmpty,
  rows,
}) => (
  <StyledTable>
    {!!rows.length && (
      <StyledThead>
        <StyledTr>
          {header.map((title, headerIndex) => (
            <StyledTh key={keyPrefix + headerIndex}>{title}</StyledTh>
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
  header: PropTypes.arrayOf(PropTypes.node).isRequired,
  isLoading: PropTypes.bool,
  keyPrefix: PropTypes.string,
  renderEmpty: PropTypes.node,
  rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.node)).isRequired,
};

Table.defaultProps = {
  expandLastColumn: false,
  isLoading: false,
  keyPrefix: '',
  renderEmpty: 'No results.',
};

export default Table;
