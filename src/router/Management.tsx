import * as React from 'react';
import { Route } from 'react-router-dom';

import { Circle } from '../pages/management';
import ManagementWrapper from '../pages/management/ManagementWrapper';

export default ({ match }: { match: { path: string } }) => (
  <ManagementWrapper>
    <Route path={`${match.path}/circle`} component={Circle} />
  </ManagementWrapper>
);
