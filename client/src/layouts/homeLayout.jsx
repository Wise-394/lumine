import { Outlet } from "react-router";
import { Header } from "../components/Header.jsx";

export function HomeLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
