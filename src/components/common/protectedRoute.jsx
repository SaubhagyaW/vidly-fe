import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import auth from '../../services/authService';

const ProtectedRoute = (props) => {
  const { path, component: Component, render, ...args } = props;

  return (
    <Route
      path={path}
      {...args}
      render={(props) => {
        if (!auth.getCurrentUser())
          return (
            <Redirect
              to={{ pathname: '/login', state: { from: props.location } }}
            />
          );
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
