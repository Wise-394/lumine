import { IndexLayout } from "../layouts/IndexLayout.jsx";
import { Home } from "../pages/Home.jsx";
import { Register } from "../pages/Register.jsx";
import { Login } from "../pages/Login.jsx";
import { Error } from "../pages/Error.jsx";
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
      {
        path: "*",
        element: <Error />,
      },
    ],
  },
];
