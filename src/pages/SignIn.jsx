import { useState } from "react";
import { useNavigate } from "react-router";
import { loginRequest } from "../utils/apiAccess";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [authResult, setAuthResult] = useState({ token: null, error: null });
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const requestBody = { email: email, password: password };
    setAuthResult(await loginRequest(requestBody));
    const pwInputEl = document.getElementById("password");
    pwInputEl.value = "";
    setPassword("");
    // navigate(-1);
  }
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
          {authResult?.token && (
            <p className="text-green-600 mt-1 font-semibold text-center">
              Authentication complete!
            </p>
          )}
          <button
            type="submit"
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
