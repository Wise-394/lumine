import { TerminalIcons } from "../components/TerminalIcons.jsx";
import { FiUser, FiLock } from "react-icons/fi";
// import { CiWarning } from "react-icons/ci";
import styles from "@styles/pages/Register.module.css";
import { Link } from "react-router";
import { useLoginForm } from "../hooks/useLoginForm.js";

export function Login() {
  const { fields, error, setError, setLoading, loading, setField } =
    useLoginForm();
  return (
    <main className={styles.container}>
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

          <form className={styles.form}>
            <div className={styles.formHeading}>
              <h2>Create account</h2>
            </div>

            <div>
              <label htmlFor="username">Username</label>
              <div className={styles.inputWrap}>
                <FiUser className={styles.inputIcon} />
                <input id="username" type="text" placeholder="your_handle" />
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
                />
              </div>
            </div>

            {/* {error && (
              <p data-testid="errorMsg" className={styles.errorMsg}>
                <CiWarning />
                {error}
              </p>
            )} */}

            <button
              type="submit"
              // disabled={loading}
              className={styles.registerBtn}
            >
              Login
              {/* {loading ? "Logging in..." : "Login"} */}
            </button>
            <p className={styles.signIn}>
              Dont have an account yet? <Link to="/register">Register</Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
