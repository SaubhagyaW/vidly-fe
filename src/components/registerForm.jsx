import React from 'react';
import Joi from 'joi-browser';

import Form from './common/form/form';

class RegisterForm extends Form {
  state = {
    data: {
      userName: '',
      password: '',
      name: ''
    },
    errors: {}
  };

  schema = {
    userName: Joi.string().required().email().label('Username'),
    password: Joi.string().required().min(5).label('Password'),
    name: Joi.string().required().label('Name')
  };

  doSubmit = () => {
    console.log('Register Form submitted.');
  };

  render() {
    return (
      <React.Fragment>
        <h1>Sign-up</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderTextField('userName', 'Username')}
          {this.renderTextField('password', 'Password', 'password')}
          {this.renderTextField('name', 'Name')}

          {this.renderButton('Register')}
        </form>
      </React.Fragment>
    );
  }
}

export default RegisterForm;
