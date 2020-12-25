import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form/form';
import userService from '../services/userService';
import auth from '../services/authService';

class RegisterForm extends Form {
  state = {
    data: {
      email: '',
      password: '',
      name: ''
    },
    errors: {}
  };

  schema = {
    email: Joi.string().required().email().label('Email'),
    password: Joi.string().required().min(5).label('Password'),
    name: Joi.string().required().label('Name')
  };

  doSubmit = async () => {
    try {
      const { headers } = await userService.saveUser(this.state.data);
      auth.authenticateUser(headers);

      window.location = '/';
    } catch (e) {
      if (e.response && e.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = e.response.data;
        this.setState({ errors: errors });
      }
    }
  };

  render() {
    return (
      <React.Fragment>
        <h1>Sign-up</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderTextField('email', 'Email')}
          {this.renderTextField('password', 'Password', 'password')}
          {this.renderTextField('name', 'Name')}

          {this.renderButton('Register')}
        </form>
      </React.Fragment>
    );
  }
}

export default RegisterForm;
