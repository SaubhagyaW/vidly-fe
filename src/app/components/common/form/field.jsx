import React from 'react';

const Field = (props) => {
  const { name, label, error, ...args } = props;

  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input className="form-control" id={name} name={name} {...args} />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Field;
