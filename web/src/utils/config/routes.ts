import { IRoute } from "../types/Route";
import { Home, Login, Dashboard } from "../../pages";

export const routes: IRoute[] = [
  {
    name: "Home",
    path: "/",
    exact: true,
    component: Home,
  },
  {
    name: "Login",
    path: "/login",
    exact: true,
    component: Login,
  },

  /*
   * DASHBOARD
   */
  {
    name: "Dashboard",
    path: "/dashboard",
    exact: true,
    component: Dashboard,
    protected: true,
  },
];
