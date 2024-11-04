import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../Components/Layouts/RootLayout";
import Home from "../Pages/Home";
import About from "../Pages/About";
import Login from "../Pages/Auth/Login";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
