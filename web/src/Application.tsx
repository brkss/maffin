import React from "react";
import { routes } from "./utils/config/routes";
import {
  BrowserRouter,
  Switch,
  Route,
  RouteComponentProps,
} from "react-router-dom";

export const Application: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          {routes.map((route, key) => (
            <Route
              key={key}
              path={route.path}
              exact={route.exact}
              render={(props: RouteComponentProps) => (
                <route.component {...route.props} {...route.name} {...props} />
              )}
            />
          ))}
        </Switch>
      </BrowserRouter>
    </>
  );
};
