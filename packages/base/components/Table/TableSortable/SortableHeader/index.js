import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import get from 'lodash/get';
import { parse } from 'query-string';
import { FILTER_PARAMS, ORDER_BY } from '../constants';

const SortableTitle = styled.div`
  &:after {
    content: '';
    flex: none;
    border: 5px solid;
    border-left-color: transparent;
    border-right-color: transparent;
    opacity: 0.4;
    margin: 0 ${p => p.theme.space[2]} 0 ${p => p.theme.space[0]};
  }

  &:hover {
    &:after {
      color: ${p => p.theme.colors.primary};
    }
  }

  &.asc,
  &.desc {
    &:after {
      opacity: 1;
      color: ${p => p.theme.colors.black};
    }
  }

  &:not(.asc):after {
    margin-top: 4px;
    border-bottom-color: transparent;
  }

  &.asc :after {
    margin-top: -6px;
    border-top-color: transparent;
  }
`;

const SortableHeader = ({ header, location, updateLink }) => {
  const sortBy = header[FILTER_PARAMS.SORT_BY];
  const orderBy = header[FILTER_PARAMS.ORDER_BY];
  const queryParam = parse(location.search);
  const queryOrderBy = get(queryParam, FILTER_PARAMS.ORDER_BY);
  const querySortBy = get(queryParam, FILTER_PARAMS.SORT_BY);

  const toggleOrder = () => {
    if (sortBy !== querySortBy) return orderBy;
    if (queryOrderBy !== ORDER_BY.ASC) return ORDER_BY.ASC;
    return ORDER_BY.DESC;
  };

  if (!sortBy) return header.label;

  return (
    <SortableTitle
      alignItems="center"
      className={sortBy === querySortBy ? queryOrderBy : ''}
      cursor="pointer"
      display="flex"
      onClick={() => updateLink(sortBy, toggleOrder())}
    >
      <span>{header.label}</span>
    </SortableTitle>
  );
};

SortableHeader.propTypes = {
  header: PropTypes.shape({ label: PropTypes.string }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
    search: PropTypes.string,
  }).isRequired,
  updateLink: PropTypes.func.isRequired,
};

export default SortableHeader;
