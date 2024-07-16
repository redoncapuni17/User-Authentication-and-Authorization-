import React from "react";

import Login from "./components/Controller/auth/login";

import { AuthProvider } from "./contexts/authContext";
import { useRoutes } from "react-router-dom";
import AdminDashboard from "./components/Controller/Admin/adminDashboard";
import ListOfUser from "./components/Controller/Admin/listofUsers";
import Home from "./components/Controller/home";

const LazyRegister = React.lazy(() =>
  import("./components/Controller/auth/register")
);

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
      element: <Home />,
      children: [
        {
          path: "dashboard",
          element: <AdminDashboard />,
          index: true,
        },
        {
          path: "users",
          element: <ListOfUser />,
        },
      ],
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
