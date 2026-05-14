import { Register } from "../pages/Register.jsx";
import { Login } from "../pages/Login.jsx";
import { Error } from "../pages/Error.jsx";
import { Code } from "../pages/Code.js";
import { HomeLayout } from "../layouts/homeLayout.jsx";
import { LandingLayout } from "../layouts/LandingLayout.jsx";
import { LandingPage } from "../pages/LandingPage.jsx";
import { Home } from "../pages/Home.js";
// routes/AppRoutes.jsx
export const appRoutes = [
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      { path: "code", element: <Code /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    path: "/landing-page",
    element: <LandingLayout />,
    errorElement: <Error />,
    children: [{ index: true, element: <LandingPage /> }],
  },
];
