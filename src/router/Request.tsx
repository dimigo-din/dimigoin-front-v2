import * as React from 'react';
import { Route } from 'react-router-dom';

import { Login } from '../pages';
import RequestWrapper from '../pages/request/RequestWrapper';

export default ({ match }: { match: { path: string } }) => (
  <RequestWrapper>
    <Route path={`${match.path}/circle/application`} component={Login} />
  </RequestWrapper>
);
