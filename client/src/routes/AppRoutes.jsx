import { Register } from "../pages/Register.jsx";
import { Login } from "../pages/Login.jsx";
import { Error } from "../pages/Error.jsx";
import { NewPost } from "../pages/NewPost.jsx";
import { RootLayout } from "../layouts/RootLayout.jsx";
import { LandingLayout } from "../layouts/LandingLayout.jsx";
import { LandingPage } from "../pages/LandingPage.jsx";
import { Home } from "../pages/Home.jsx";
import { Profile } from "../pages/Profile.jsx";

export const appRoutes = [
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      { path: "post", element: <NewPost /> },
      { path: "profile", element: <Profile /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <Error />,
  },
  {
    path: "/landing-page",
    element: <LandingLayout />,
    errorElement: <Error />,
    children: [{ index: true, element: <LandingPage /> }],
  },
];
