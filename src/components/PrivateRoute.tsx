import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

interface IProps extends RouteProps{
  component: React.ComponentType<any>;
}

const PrivateRoute = ({ component: Component, ...rest }: IProps) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem('token') !== null ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/auth/login',
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

export default PrivateRoute;
