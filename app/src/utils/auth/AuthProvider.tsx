import React, { Children } from "react";
import { getAccessToken } from "../token/token";

type IToken = null | string;

export const AuthContext = React.createContext<{
  token: IToken;
  login: (_token: string) => void;
  logout: () => void;
}>({
  token: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC = ({ children }) => {
  const [token, SetToken] = React.useState<IToken>(null);

  return (
    <AuthContext.Provider
      value={{
        token,
        login: (_token) => {
          SetToken(_token);
          console.log("SETUP TOKEN ON CONTEXT !");
        },
        logout: () => {
          SetToken(null);
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
