import React from "react";

import Login from "./components/auth/login";
// import Register from "./components/auth/register";
import Logout from "./components/logout/logout";
// import Home from "./components/home/home";
import { AuthProvider } from "./contexts/authContext";
import { useRoutes } from "react-router-dom";

const LazyHome = React.lazy(() => import("./components/home/home"));
const LazyRegister = React.lazy(() => import("./components/auth/register"));

function App() {
  const routesArray = [
    {
      path: "*",
      element: <Login />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: (
        <React.Suspense fallback="Loading...">
          <LazyRegister />
        </React.Suspense>
      ),
    },
    {
      path: "/home",
      element: (
        <React.Suspense fallback="Loading...">
          <LazyHome />
        </React.Suspense>
      ),
    },
  ];
  let routesElement = useRoutes(routesArray);
  return (
    <AuthProvider>
      <div>{routesElement}</div>
    </AuthProvider>
  );
}

export default App;
