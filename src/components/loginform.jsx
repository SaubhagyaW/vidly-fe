import React from 'react';
import { Redirect } from 'react-router-dom';
import Joi from 'joi-browser';
import Form from './common/form/form';
import auth from '../services/authService';

class LoginForm extends Form {
  state = {
    data: {
      email: '',
      password: ''
    },
    errors: {}
  };

  schema = {
    email: Joi.string().required().label('Email'),
    password: Joi.string().required().label('Password')
  };

  doSubmit = async () => {
    try {
      await auth.login(this.state.data);

      // Fully reload the application,
      // because "componentdidMount" method in "App" module needs to be called in order to set "state.user".
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : '/';
    } catch (e) {
      if (e.response && e.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = e.response.data;
        this.setState({ errors: errors });
      }
    }
  };

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />;

    return (
      <React.Fragment>
        <h1>Sign-in</h1>
        {/* form>(div.form-group>label+input.form-control)*2 */}
        <form onSubmit={this.handleSubmit}>
          {this.renderTextField('email', 'Email')}
          {this.renderTextField('password', 'Password', 'password')}

          {this.renderButton('Login')}
        </form>
      </React.Fragment>
    );
  }
}

export default LoginForm;
