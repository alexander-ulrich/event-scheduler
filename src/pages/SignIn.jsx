import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { loginRequest } from "../utils/apiAccess";
import { useAuthContext } from "../contexts";

export default function SignIn() {
  const { token, setToken } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [authResult, setAuthResult] = useState({
    credentials: null,
    error: null,
    success: false,
  });
  const pwRef = useRef();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const requestBody = { email: email, password: password };

      const res = await loginRequest(requestBody);
      setAuthResult(res);
      console.log("Token from login Response:" + res.token);

      setToken(res.token);
    } catch (error) {
      console.log(error.message);
    } finally {
      //  State zurücksetzen
      setPassword("");
      pwRef.current.value = "";
    }
  }

  useEffect(() => {
    if (authResult.success) navigate("/");
  }, [authResult.success]);

  return (
    <div className="flex flex-col items-center">
      <form onSubmit={handleSubmit}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Login</legend>

          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="input"
            placeholder="Email"
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
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          {authResult?.error && (
            <p className="text-red-600 mt-1 font-semibold text-center">
              {authResult?.error}
            </p>
          )}
          {authResult?.success && (
            <p className="text-green-600 mt-1 font-semibold text-center">
              Authentication complete!
            </p>
          )}
          <button
            type="submit"
            // onClick hier ist nicht nötig , da onSubmit bereits im Form gesetzt ist.
            onClick={handleSubmit}
            className="btn btn-neutral mt-4"
          >
            Login
          </button>
        </fieldset>
      </form>
    </div>
  );
}
