import * as React from 'react';
import { Login } from '../pages';
import Route from '../components/PrivateRoute'

export default ({ match }: { match: { path: string } }) => (
  <>
    <Route path={`${match.path}/login`} component={Login} />
  </>
);
