import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {
  Main, Draft, Meal, ExplorerFound, NotFound,
} from '../pages';

import Management from './Management';
import Auth from './Auth';
import Request from "./Request";

const Router: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Main} />
      <Route exact path="/draft" component={Draft} />
      <Route exact path="/meal" component={Meal} />
      <Route exact path="/ienope" component={ExplorerFound} />
      <Route path="/auth" component={Auth} />
      <Route path="/management" component={Management} />
      <Route path="/request" component={Request} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;
