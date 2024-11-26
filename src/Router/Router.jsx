import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../Components/Layouts/RootLayout";
import About from "../Pages/About";
import Login from "../Pages/Auth/Login";
import Dashboard from "../Pages/Admin/Dashboard";
import SuperDashboard from "../Pages/SuperAdmin/SuperDashboard";
import AdminUpdateForm from "../Pages/SuperAdmin/AdminUpdateForm";
import AdminLogin from "../Pages/Auth/AdminLogin";
import Category from "../Pages/Admin/Category/Category";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/category",
        element: <Category />,
      },
      {
        path: "/superdashboard",
        element: <SuperDashboard />,
      },
      {
        path: "/adminupdateform",
        element: <AdminUpdateForm />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/adminlogin",
    element: <AdminLogin />,
  },
]);

export default router;
