import React from 'react';
import PropTypes from 'prop-types';
import { Location } from '@reach/router';
import Table from '../Table';
import SortableHeader from './SortableHeader';
import { FILTER_PARAMS, ORDER_BY } from './constant';

// TODO : move to common-ui
const setSortableHeader = (sortableHeader, updateLink) =>
  sortableHeader.map(item => {
    const updatedHeader = {
      label: item.label || '',
    };
    updatedHeader[FILTER_PARAMS.ORDER_BY] =
      item[FILTER_PARAMS.ORDER_BY] || ORDER_BY.DESC;
    updatedHeader[FILTER_PARAMS.SORT_BY] = item.value || '';
    return (
      <Location>
        {location => (
          <SortableHeader
            {...location}
            header={updatedHeader}
            updateLink={updateLink}
          />
        )}
      </Location>
    );
  });

const TableSortable = ({ sortableHeader, updateLink, ...rest }) => {
  return (
    <Table header={setSortableHeader(sortableHeader, updateLink)} {...rest} />
  );
};

TableSortable.propTypes = {
  sortableHeader: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  updateLink: PropTypes.func.isRequired,
};

export default TableSortable;
