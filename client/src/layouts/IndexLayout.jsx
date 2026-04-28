import { Header } from "../components/Header.jsx";
import { Outlet } from "react-router";
export function IndexLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
