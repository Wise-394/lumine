import { Header } from "../components/Header.jsx";
import { Outlet } from "react-router";

export function LandingLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
