import { useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";
import { registerRequest } from "../utils/apiAccess";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [registerResult, setRegisterResult] = useState({
    credentials: null,
    error: null,
    success: false,
  });
  const pwRef = useRef();
  const navigate = useNavigate();

  //add new User to API database
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const requestBody = { email: email, password: password };
      const res = await registerRequest(requestBody);
      setRegisterResult(res);
    } catch (error) {
      console.log(error.message);
      setRegisterResult(res);
    } finally {
      //  State zurücksetzen
      setLoading(false);
      setPassword("");
      pwRef.current.value = "";
    }
  }
  //Redirect to login page on successful registrtion for authentication
  useEffect(() => {
    if (registerResult.success) navigate("/sign-in");
  }, [registerResult.success]);

  return (
    <div className="flex flex-col my-50 items-center">
      <form onSubmit={handleSubmit}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Register</legend>

          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="input"
            placeholder="Email"
            disabled={loading}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <label htmlFor="password" className="label">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            ref={pwRef}
            className="input"
            placeholder="Password"
            disabled={loading}
            autoComplete="new-password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          {registerResult?.error && (
            <p className="text-red-600 mt-1 font-semibold text-center">
              {registerResult?.error}
            </p>
          )}
          {registerResult?.success && (
            <p className="text-green-600 mt-1 font-semibold text-center">
              Registration complete! Redirecting...
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="btn btn-neutral mt-4"
          >
            {loading ? "Submitting..." : "Register"}
          </button>
        </fieldset>
      </form>
    </div>
  );
}
