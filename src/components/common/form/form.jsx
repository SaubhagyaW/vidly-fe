import React, { Component } from 'react';
import Joi from 'joi-browser';
import Field from './field';
import SelectField from './selectField';

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  validateForm = () => {
    const { error } = Joi.validate(this.state.data, this.schema, {
      abortEarly: false
    });

    const errors = {};
    if (!error) return errors;

    for (let d of error.details) errors[d.path[0]] = d.message;

    return errors;
  };

  validateField = (field) => {
    const { name, value } = field;

    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleChange = (e) => {
    const { currentTarget: field } = e;

    const errors = { ...this.state.errors };
    const errorMsg = this.validateField(field);
    if (errorMsg) errors[field.name] = errorMsg;
    else delete errors[field.name];

    const data = { ...this.state.data };
    data[field.name] = field.value;
    this.setState({ data: data, errors: errors });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validateForm();
    this.setState({ errors: errors });

    if (Object.keys(errors) === 0) return;

    this.doSubmit();
  };

  renderTextField(name, label, type = 'text') {
    const { data, errors } = this.state;

    return (
      <Field
        name={name}
        type={type}
        value={data[name]}
        label={label}
        error={errors[name]}
        onChange={this.handleChange}
      />
    );
  }

  renderSelectField(name, label, options) {
    const { data, errors } = this.state;

    return (
      <SelectField
        name={name}
        value={data[name]}
        label={label}
        options={options}
        error={errors[name]}
        onChange={this.handleChange}
      />
    );
  }

  renderButton(label) {
    return <button className="btn btn-primary">{label}</button>;
  }

  // render() {
  //     return (  );
  // }
}

export default Form;
