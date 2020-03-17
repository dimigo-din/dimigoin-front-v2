import * as React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';

import Main from '../pages/Main';
const Draft = React.lazy(() => import('../pages/Draft'));
const Meal = React.lazy(() => import('../pages/Meal'));
const ExplorerFound = React.lazy(() => import('../pages/ExplorerFound'));
const NotFound = React.lazy(() => import('../pages/NotFound'));

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
