import Login from "./components/auth/login";
import Register from "./components/auth/register";

import Logout from "./components/logout/logout";
import Home from "./components/home/home";

import { AuthProvider } from "./contexts/authContext";
import { useRoutes } from "react-router-dom";

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
      element: <Register />,
    },
    {
      path: "/home",
      element: <Home />,
    },
  ];
  let routesElement = useRoutes(routesArray);
  return (
    <AuthProvider>
      <div className=" ">{routesElement}</div>
      <Logout />
    </AuthProvider>
  );
}

export default App;
