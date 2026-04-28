import { createBrowserRouter, RouterProvider } from "react-router";
import { appRoutes } from "./routes/AppRoutes.jsx";
export function App() {
  const router = createBrowserRouter(appRoutes);
  return <RouterProvider router={router} />;
}

export default App;
