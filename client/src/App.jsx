import { createBrowserRouter, RouterProvider } from "react-router";
import { appRoutes } from "./routes/AppRoutes.jsx";

const router = createBrowserRouter(appRoutes);

export function App() {
  return <RouterProvider router={router} />;
}

export default App;
