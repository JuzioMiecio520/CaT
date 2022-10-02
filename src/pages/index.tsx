import { Route } from "@tanstack/react-location";
import homeRoutes from "./home";

import LandingPage from "./LandingPage";
import Login from "./Login";

const routes: Route[] = [
  { path: "/", element: <LandingPage /> },
  { path: "/login", element: <Login /> },
  ...homeRoutes,
];

export default routes;
