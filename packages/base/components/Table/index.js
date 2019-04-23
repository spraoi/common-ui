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
  padding: ${p => p.theme.space.sm} 0;
`;

const Table = ({ header, isLoading, keyPrefix, renderEmpty, rows }) => (
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
              <StyledTd key={keyPrefix + cellIndex}>{cell}</StyledTd>
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
  header: PropTypes.arrayOf(PropTypes.node).isRequired,
  isLoading: PropTypes.bool,
  keyPrefix: PropTypes.string,
  renderEmpty: PropTypes.node,
  rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.node)).isRequired,
};

Table.defaultProps = {
  isLoading: false,
  keyPrefix: '',
  renderEmpty: 'No results.',
};

export default Table;
