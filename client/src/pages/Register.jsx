import { useRegisterForm } from "../hooks/useRegisterForm";
import { apiFetch } from "../helpers/api.js";
export function Register() {
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
      setError("Passwords don't match");
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
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={fields.username}
          onChange={(e) => setField("username", e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={fields.password}
          onChange={(e) => setField("password", e.target.value)}
        />

        <label htmlFor="repeatPassword">Repeat Password</label>
        <input
          id="repeatPassword"
          type="password"
          value={fields.repeatPassword}
          onChange={(e) => setField("repeatPassword", e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
      {error && <p data-testid="errorMsg">{error}</p>}
    </main>
  );
}
