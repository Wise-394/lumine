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
        <input type="text" onChange={setField("username")} />

        <label>Password</label>
        <input type="password" onChange={setField("password")} />

        <label>Repeat Password</label>
        <input type="password" onChange={setField("repeatPassword")} />

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
      {error && <p>{error}</p>}
    </main>
  );
}
