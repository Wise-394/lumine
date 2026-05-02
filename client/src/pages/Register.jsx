import { useRegisterForm } from "../hooks/useRegisterForm";
import { apiFetch } from "../helpers/api.js";
export function Register() {
  const { fields, error, setError, setLoading, loading, setField } =
    useRegisterForm();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (fields.password !== fields.repeatPassword) {
      setError("Passwords don't match");
      return;
    }
    setError(null);
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
        <label>Username</label>
        <input
          type="text"
          value={fields.username}
          onChange={(e) => setField("username", e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          value={fields.password}
          onChange={(e) => setField("password", e.target.value)}
        />

        <label>Repeat Password</label>
        <input
          type="password"
          value={fields.repeatPassword}
          onChange={(e) => setField("repeatPassword", e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
      {error && <p>{error}</p>}
    </main>
  );
}
