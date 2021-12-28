import React from "react";
import { routes } from "./utils/config/routes";
import {
  BrowserRouter,
  Switch,
  Route,
  RouteComponentProps,
} from "react-router-dom";
import { GuardRoute } from "./components/GuardRoute";

export const Application: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          {routes.map((route, key) =>
            route.protected ? (
              <GuardRoute route={route} />
            ) : (
              <Route
                key={key}
                path={route.path}
                exact={route.exact}
                render={(props: RouteComponentProps) => (
                  <route.component
                    {...route.props}
                    {...route.name}
                    {...props}
                  />
                )}
              />
            )
          )}
        </Switch>
      </BrowserRouter>
    </>
  );
};
