import { useRegisterForm } from "../hooks/useRegisterForm";

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
      // TODO: call register api
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
          onChange={(e) => setField("username", e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          onChange={(e) => setField("password", e.target.value)}
        />

        <label>Repeat Password</label>
        <input
          type="password"
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
