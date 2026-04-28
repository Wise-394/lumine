import { IndexLayout } from "../layouts/IndexLayout.jsx";
import { Home } from "../pages/Home.jsx";
import { Register } from "../pages/Register.jsx";
import { Login } from "../pages/Login.jsx";
export const appRoutes = [
  {
    path: "/",
    element: <IndexLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
];
