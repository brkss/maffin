import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AppNavigation } from "./AppNavigation";
import { AuthNavigation } from "./AuthNavigation";
import { AuthContext } from "../utils/auth/AuthProvider";

export const MainNavigation: React.FC = () => {
  const { token } = React.useContext(AuthContext);

  return (
    <>
      <NavigationContainer>
        {token ? <AppNavigation /> : <AuthNavigation />}
      </NavigationContainer>
    </>
  );
};
