import * as React from 'react';
import { Route } from 'react-router-dom';
import { Circle } from '../pages/management';

export default ({ match }: { match: { path: string } }) => (
  <>
    <Route path={`${match.path}/circle`} component={Circle} />
  </>
);
