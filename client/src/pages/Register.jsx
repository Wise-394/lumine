import { useRegisterForm } from "../hooks/useRegisterForm";
import { apiFetch } from "../helpers/api.js";
import { useNavigate } from "react-router";
import { TerminalIcons } from "../components/TerminalIcons.jsx";
import { FiUser, FiLock } from "react-icons/fi";
import { CiWarning } from "react-icons/ci";
import styles from "@styles/pages/Register.module.css";

export function Register() {
  const navigate = useNavigate();
  const { fields, error, setError, setLoading, loading, setField } =
    useRegisterForm();

  const validateInput = () => {
    if (!fields.username || !fields.password) {
      setError("Username or password cannot be empty");
      return false;
    }

    if (fields.password.length < 8) {
      setError("Password must be 8 characters or more");
      return false;
    }

    if (fields.password !== fields.repeatPassword) {
      setError("Passwords doesn't match");
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
      await apiFetch("/register", {
        method: "POST",
        body: JSON.stringify({
          username: fields.username,
          password: fields.password,
        }),
      });
      navigate("/login", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.container}>
      <div className={styles.leftPanel}>
        <div className={styles.leftContent}>
          <p className={styles.tagline}>
            Start Sharing
            <br />
            Aesthetic <span>Code Snippet.</span>
          </p>
          <p className={styles.subtext}>
            A Social media platform to share code snippets.
          </p>
        </div>
      </div>

      <div className={styles.rightPanel}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <TerminalIcons />
            <p>register</p>
            <p></p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formHeading}>
              <h2>Create account</h2>
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

            <div>
              <label htmlFor="repeatPassword">Repeat Password</label>
              <div className={styles.inputWrap}>
                <FiLock className={styles.inputIcon} />
                <input
                  id="repeatPassword"
                  type="password"
                  placeholder="confirm password"
                  value={fields.repeatPassword}
                  onChange={(e) => setField("repeatPassword", e.target.value)}
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
              {loading ? "Registering..." : "Register"}
            </button>
            <p className={styles.signIn}>
              Already have one? <a href="/login">Sign in</a>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
