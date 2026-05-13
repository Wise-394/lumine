import { useAuthenticationStore } from "../store/authenticationStore.jsx";
import { useNavigate } from "react-router";
export function HomeHeader() {
  const { logout } = useAuthenticationStore();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <header>
      <button onClick={handleLogout}>Logout</button>
    </header>
  );
}
