import { Outlet } from "react-router";
import { HomeHeader } from "../components/HomeHeader.jsx";
export function HomeLayout() {
  return (
    <>
      <HomeHeader />
      <Outlet />
    </>
  );
}
