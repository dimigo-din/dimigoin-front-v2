import * as React from "react";
import { Route } from "react-router-dom";
import { Circle, CircleApplication } from "../pages/request";

export default ({ match }: { match: { path: string } }) => (
  <>
    <Route exact path={`${match.path}/circle`} component={Circle} />
    <Route
      path={`${match.path}/circle/application`}
      component={CircleApplication}
    />
  </>
);
