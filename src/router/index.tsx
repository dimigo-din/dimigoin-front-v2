import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute';
import {
  Main, Draft, Meal, ExplorerFound, NotFound,
} from '../pages';

import Management from './Management';
import Auth from './Auth';
import Request from './Request';

const Router: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <PrivateRoute exact path="/" component={Main} />
      <PrivateRoute exact path="/draft" component={Draft} />
      <PrivateRoute exact path="/meal" component={Meal} />
      <Route exact path="/ienope" component={ExplorerFound} />
      <Route path="/auth" component={Auth} />
      <PrivateRoute path="/management" component={Management} />
      <Route path="/request" component={Request} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;
