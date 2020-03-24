import * as React from 'react';
import PrivateRoute from '../components/PrivateRoute';

import { CircleApplication, CircleCreation } from '../pages/management';
import ManagementWrapper from '../pages/management/ManagementWrapper';

export default ({ match }: { match: { path: string } }) => (
  <ManagementWrapper>
    <PrivateRoute exact path={`${match.path}/circle`} component={CircleCreation} />
    <PrivateRoute path={`${match.path}/circle/application`} component={CircleApplication} />
  </ManagementWrapper>
);
