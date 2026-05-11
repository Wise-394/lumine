import { IndexLayout } from "../layouts/IndexLayout.jsx";
import { Home } from "../pages/Home.jsx";
import { Register } from "../pages/Register.jsx";
import { Login } from "../pages/Login.jsx";
import { Error } from "../pages/Error.jsx";
import { HomeLayout } from "../layouts/homeLayout.jsx";
import { Code } from "../pages/Code.js";
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
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "*",
        element: <Error />,
      },
    ],
  },
  {
    path: "/home",
    element: <HomeLayout />,
    children: [{ path: "code", element: <Code /> }],
  },
];
// TODO: On app init, grab the JWT from localStorage -> verify it's valid and not expired
//       -> if VALID:   swap the "/" route's element from <IndexLayout /> to <HomeLayout />  (user is logged in, )
//       -> if INVALID: clear the token, keep <IndexLayout /> as is                         (user is not logged in, show landing)
//       -> move auth state into a context/store so the swap is REACTIVE,
//          and i can just call that to check if user is logged int
