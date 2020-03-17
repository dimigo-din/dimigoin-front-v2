import loadable from '@loadable/component';
import * as React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';

import Main from '../pages/Main';
const Draft = loadable(() => import('../pages/Draft'));
const Meal = loadable(() => import('../pages/Meal'));
const ExplorerFound = loadable(() => import('../pages/ExplorerFound'));
const NotFound = loadable(() => import('../pages/NotFound'));

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/draft" component={Draft} />
        <Route exact path="/meal" component={Meal} />
        <Route exact path="/ienope" component={ExplorerFound} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
