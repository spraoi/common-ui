import PropTypes from 'prop-types';
import React from 'react';
import { navigate } from '@reach/router';
import Card from '../../Card';
import Table from '../../Table';

const TabTable = ({
  currentTab,
  generateLink,
  header,
  rowTabIndex,
  rows,
  sx,
}) => (
  <Card sx={{ p: 0, ...sx }}>
    <Table
      activeRowIndex={rows.findIndex(r => r[rowTabIndex] === currentTab)}
      header={header}
      onRowClick={row =>
        navigate(generateLink(row[rowTabIndex]), { replace: true })
      }
      rows={rows}
    />
  </Card>
);

TabTable.propTypes = {
  currentTab: PropTypes.string,
  generateLink: PropTypes.func.isRequired,
  header: PropTypes.arrayOf(PropTypes.node).isRequired,
  rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.node)).isRequired,
  rowTabIndex: PropTypes.number.isRequired,
  sx: PropTypes.shape({}),
};

TabTable.defaultProps = {
  currentTab: null,
  sx: {},
};

export default TabTable;
