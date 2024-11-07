import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../Components/Layouts/RootLayout";
import About from "../Pages/About";
import Login from "../Pages/Auth/Login";
import Dashboard from "../Pages/Admin/Dashboard";
import SuperDashboard from "../Pages/SuperAdmin/SuperDashboard";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/superdashboard",
        element: <SuperDashboard />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
