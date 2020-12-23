import React from 'react';
import _ from 'lodash';

import PropTypes from 'prop-types';

// Stateless Functional Component (SFC)
const Pagination = (props) => {
  const { itemsCount, pageSize, currentPage, onPageChange } = props;
  let pageCount = Math.ceil(itemsCount / pageSize);

  if (pageCount === 1) return null;

  const pages = _.range(1, pageCount + 1);
  // nav>ul.pagination>li.pag-item>a.page-link
  return (
    <nav>
      <ul className="pagination">
        {pages.map((p) => {
          return (
            <li
              key={p}
              className={p === currentPage ? 'page-item active' : 'page-item'}
            >
              <a className="page-link" onClick={() => onPageChange(p)}>
                {p}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;
