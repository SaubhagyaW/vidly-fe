import React from 'react';

const ListGroup = (props) => {
  const { items, selectedItem, keyProp, textProp, onItemSelect } = props;

  // ul.list-group>li.list-group-item
  return (
    <ul className="list-group">
      {items.map((i) => (
        <li
          key={i[keyProp]}
          onClick={() => onItemSelect(i)}
          className={
            i[keyProp] === selectedItem[keyProp]
              ? 'list-group-item active'
              : 'list-group-item'
          }
        >
          {i[textProp]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  keyProp: '_id',
  textProp: 'name'
};

export default ListGroup;
