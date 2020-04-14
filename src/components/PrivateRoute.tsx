import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

console.log(cookies.get('accessToken'))


interface IProps extends RouteProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.ComponentType<any>;
}

const PrivateRoute = ({ component: Component, ...rest }: IProps) => (
  <Route
    {...rest}
    render={(props) => (cookies.get('accessToken') ? (
      <Component {...props} />
    ) : (
      <Redirect
        to={{
          pathname: '/auth/login',
          state: { from: props.location },
        }}
      />
    ))}
  />
);

export default PrivateRoute;
