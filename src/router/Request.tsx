import * as React from 'react';
import Route from '../components/PrivateRoute'

import { Circle, CircleApplication } from '../pages/request';
import RequestWrapper from '../pages/request/RequestWrapper';

export default ({ match }: { match: { path: string } }) => (
  <RequestWrapper>
    <Route exact path={`${match.path}/circle`} component={Circle} />
    <Route
      path={`${match.path}/circle/application`}
      component={CircleApplication}
    />
  </RequestWrapper>
);
