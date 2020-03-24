import * as React from 'react';
import PrivateRoute from '../components/PrivateRoute';

import { Circle, CircleApplication } from '../pages/request';
import RequestWrapper from '../pages/request/RequestWrapper';

export default ({ match }: { match: { path: string } }) => (
  <RequestWrapper>
    <PrivateRoute exact path={`${match.path}/circle`} component={Circle} />
    <PrivateRoute
      path={`${match.path}/circle/application`}
      component={CircleApplication}
    />
  </RequestWrapper>
);
