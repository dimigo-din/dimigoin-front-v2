import * as React from 'react';
import PrivateRoute from '../components/PrivateRoute';

import { Circle, CircleCreation, CircleManage } from '../pages/management';
import ManagementWrapper from '../pages/management/ManagementWrapper';

export default ({ match }: { match: { path: string } }) => (
  <ManagementWrapper>
    <PrivateRoute exact path={`${match.path}/circle`} component={CircleCreation} />
    <PrivateRoute path={`${match.path}/circle/application`} component={Circle} />
    <PrivateRoute path={`${match.path}/circle/manage`} component={CircleManage} />
  </ManagementWrapper>
);
