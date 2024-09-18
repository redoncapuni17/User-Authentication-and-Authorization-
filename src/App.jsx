import React from "react";

import { AuthProvider } from "./contexts/authContext";
import { useRoutes } from "react-router-dom";
import Login from "./pages/Login/login";
import AdminDashboard from "./pages/Admin/adminDashboard";
import ListOfUser from "./pages/Admin/listofUsers";
import Home from "./components/home";

const LazyRegister = React.lazy(() => import("./pages/Login/register"));

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
