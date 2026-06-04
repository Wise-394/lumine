import { TerminalIcons } from "../components/TerminalIcons.jsx";
import { FiUser, FiLock } from "react-icons/fi";
import { CiWarning } from "react-icons/ci";
import styles from "@styles/pages/Register.module.css";
import { Link, useNavigate } from "react-router";
import { useLoginForm } from "../hooks/useLoginForm.js";
import { apiFetch } from "../helpers/api.js";
import { useAuthenticationStore } from "../store/authenticationStore.jsx";
import { Header } from "../components/Header.jsx";

export function Login() {
  const login = useAuthenticationStore((state) => state.login);
  const navigate = useNavigate();
  const { fields, error, setError, setLoading, loading, setField } =
    useLoginForm();

  const validateInput = () => {
    if (!fields.username || !fields.password) {
      setError("Username or password cannot be empty");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!validateInput()) return;

    setLoading(true);
    try {
      const data = await apiFetch("/login", {
        method: "POST",
        body: JSON.stringify({
          username: fields.username,
          password: fields.password,
        }),
      });

      clearInputs();

      login(data.token);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const clearInputs = () => {
    setField("username", "");
    setField("password", "");
  };

  return (
    <>
      <Header />
      <main className={styles.registerLoginContainer}>
        <div className={styles.leftPanel}>
          <div className={styles.leftContent}>
            <p className={styles.tagline}>
              Welcome Back
              <br />
              <span>Start Sharing</span>
            </p>
            <p className={styles.subtext}>Enter your details to login</p>
          </div>
        </div>

        <div className={styles.rightPanel}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <TerminalIcons />
              <p>Login</p>
              <p></p>
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formHeading}>
                <h2>Login Your Account</h2>
              </div>

              <div>
                <label htmlFor="username">Username</label>
                <div className={styles.inputWrap}>
                  <FiUser className={styles.inputIcon} />
                  <input
                    id="username"
                    type="text"
                    placeholder="your_handle"
                    value={fields.username}
                    onChange={(e) => setField("username", e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password">Password</label>
                <div className={styles.inputWrap}>
                  <FiLock className={styles.inputIcon} />
                  <input
                    id="password"
                    type="password"
                    placeholder="min. 8 characters"
                    value={fields.password}
                    onChange={(e) => setField("password", e.target.value)}
                  />
                </div>
              </div>

              {error && (
                <p data-testid="errorMsg" className={styles.errorMsg}>
                  <CiWarning />
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className={styles.registerBtn}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
              <p className={styles.signIn}>
                Dont have an account yet? <Link to="/register">Register</Link>
              </p>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
