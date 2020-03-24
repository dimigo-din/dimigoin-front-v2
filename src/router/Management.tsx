import * as React from 'react';
import PrivateRoute from '../components/PrivateRoute';

import { Circle } from '../pages/management';
import ManagementWrapper from '../pages/management/ManagementWrapper';

export default ({ match }: { match: { path: string } }) => (
  <ManagementWrapper>
    <PrivateRoute path={`${match.path}/circle`} component={Circle} />
  </ManagementWrapper>
);
