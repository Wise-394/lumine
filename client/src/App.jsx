import { createBrowserRouter, RouterProvider } from "react-router";
import { appRoutes } from "./routes/AppRoutes.jsx";
import { useAuthenticationStore } from "./store/authenticationStore.jsx";
import { useEffect } from "react";

const router = createBrowserRouter(appRoutes);

export function App() {
  const { initAuth } = useAuthenticationStore();
  useEffect(() => {
    initAuth();
  }, [initAuth]);

  return <RouterProvider router={router} />;
}

export default App;
