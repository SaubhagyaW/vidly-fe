import React from 'react';
import Joi from 'joi-browser';

import Form from './common/form/form';

class LoginForm extends Form {
  state = {
    data: {
      userName: '',
      password: ''
    },
    errors: {}
  };

  schema = {
    userName: Joi.string().required().label('Username'),
    password: Joi.string().required().label('Password')
  };

  doSubmit = () => {
    console.log('Login Form submitted.');
  };

  render() {
    return (
      <React.Fragment>
        <h1>Sign-in</h1>
        {/* form>(div.form-group>label+input.form-control)*2 */}
        <form onSubmit={this.handleSubmit}>
          {this.renderTextField('userName', 'Username')}
          {this.renderTextField('password', 'Password', 'password')}

          {this.renderButton('Login')}
        </form>
      </React.Fragment>
    );
  }
}

export default LoginForm;
