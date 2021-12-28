import React from "react";
import { routes } from "./utils/config/routes";
import {
  BrowserRouter,
  Switch,
  Route,
  RouteComponentProps,
} from "react-router-dom";
import { Spinner, Center } from "@chakra-ui/react";
import { GuardRoute } from "./components/GuardRoute";
import { setAccessToken, getAccessToken } from "./utils/token/token";
import { URI } from "./utils/config/defaults";

export const Application: React.FC = () => {
  const [loading, SetLoading] = React.useState(true);

  React.useEffect(() => {
    fetch(`${URI}/refresh_token`, {
      credentials: "include",
      method: "POST",
    }).then(async (res) => {
      const data = await res.json();
      if (data.status === true) {
        setAccessToken(data.token);
        console.log("access token", getAccessToken());
      }
      console.log("refresh token result => ", data);

      SetLoading(false);
    });
  }, []);

  if (loading)
    return (
      <Center h={"100vh"}>
        <Spinner />
      </Center>
    );

  return (
    <>
      <BrowserRouter>
        <Switch>
          {routes.map((route, key) =>
            route.protected ? (
              <GuardRoute key={key} route={route} />
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
