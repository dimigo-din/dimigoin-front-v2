import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Main, Draft, Meal, ExplorerFound, NotFound } from "../pages";

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
