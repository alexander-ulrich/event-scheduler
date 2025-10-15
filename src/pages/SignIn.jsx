import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { loginRequest } from "../utils/apiAccess";
import { useAuthContext } from "../contexts/AuthContext";

export default function SignIn() {
  // Nur setToken wird benötigt, da wir In-Memory Token speichern
  const { setToken } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [authResult, setAuthResult] = useState({
    credentials: null,
    error: null,
    success: false,
  });

  const pwRef = useRef(); // Passwortfeld zurücksetzen
  const navigate = useNavigate();

  // ========================
  // Login Handler
  // ========================
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const requestBody = { email, password };
      const res = await loginRequest(requestBody); // API Call aus apiAccess.js
      setAuthResult(res);

      if (res.success) {
        // Token wird nur In-Memory gesetzt
        setToken(res.credentials?.token || null);
      }
    } catch (error) {
      console.log(error.message);
      setAuthResult({ credentials: null, error: error.message, success: false });
    } finally {
      setLoading(false);
      setPassword("");
      if (pwRef.current) pwRef.current.value = "";
    }
  }

  // ========================
  // Redirect nach erfolgreichem Login
  // ========================
  useEffect(() => {
    if (authResult.success) {
      navigate("/"); // zurück zur Startseite
    }
  }, [authResult.success]);

  // ========================
  // JSX
  // ========================
  return (
    <div className="flex flex-col items-center min-h-[70vh] justify-center px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-xs">
        <fieldset className="fieldset bg-base-200 border border-base-300 rounded-box p-6">
          <legend className="fieldset-legend text-xl font-bold text-center">Login</legend>

          {/* Email Input */}
          <label htmlFor="email" className="label mt-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="input input-bordered w-full"
            placeholder="Email"
            disabled={loading}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Passwort Input */}
          <label htmlFor="password" className="label mt-2">
            Passwort
          </label>
          <input
            type="password"
            id="password"
            ref={pwRef}
            className="input input-bordered w-full"
            placeholder="Password"
            disabled={loading}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Fehler / Erfolgsmeldungen */}
          {authResult.error && (
            <p className="text-red-600 mt-2 font-semibold text-center">{authResult.error}</p>
          )}
          {authResult.success && (
            <p className="text-green-600 mt-2 font-semibold text-center">
              Authentifizierung erfolgreich!
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full mt-4"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </fieldset>
      </form>
    </div>
  );
}
