import { useState } from "react";

export function useRegisterForm() {
  const [fields, setFields] = useState({
    username: "",
    password: "",
    repeatPassword: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const setField = (key, value) =>
    setFields((prev) => ({ ...prev, [key]: value }));

  return {
    fields,
    error,
    setError,
    setLoading,
    loading,
    setField,
  };
}
