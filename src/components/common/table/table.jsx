import React from 'react';

import TableHeader from './tableHeader';
import TableBody from './tableBody';

const Table = (props) => {
  const { data, columns, sortColumn, onSort } = props;

  return (
    // Zen Coding Technique to generate the table markup.
    // table.table>thead>tr>th*4
    <table className="table">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />

      <TableBody data={data} columns={columns} />
    </table>
  );
};

export default Table;
