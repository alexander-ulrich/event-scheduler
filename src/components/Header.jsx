import { NavLink } from "react-router";
import { useAuthContext } from "../contexts";
import { useEffect } from "react";

export default function Header() {
  const { token } = useAuthContext() || null;
  console.log("Header token: " + token);

  // Show "Login" and "Register" if user is not authenticated/logged in
  // (state "token" from AuthProvider is null)
  // otherwise show "Create Event" and Prfoile Image with dropdown menu "Logout"
  return (
    <header>
      <nav className="navbar bg-base-100 shadow-sm justify-between">
        <div className="dropdown min-[589px]:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <NavLink to={"/"}>Home</NavLink>
            </li>
            {!token && (
              <li>
                <NavLink to={"/sign-in"}>Login</NavLink>
              </li>
            )}
            {!token && (
              <li>
                <NavLink to={"/sign-up"}>Register</NavLink>
              </li>
            )}
            {token && (
              <li>
                <NavLink to={"/events/create-event"}>Create Event</NavLink>
              </li>
            )}
          </ul>
        </div>
        <div className="flex-1 max-[590px]:hidden justify-between">
          <NavLink to={"/"} className="btn btn-ghost text-xl">
            Home
          </NavLink>
          {!token && (
            <NavLink to={"/sign-in"} className="btn btn-ghost text-xl">
              Login
            </NavLink>
          )}
          {!token && (
            <NavLink to={"/sign-up"} className="btn btn-ghost text-xl">
              Register
            </NavLink>
          )}
          {token && (
            <NavLink
              to={"/events/create-event"}
              className="btn btn-ghost text-xl"
            >
              Create Event
            </NavLink>
          )}
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-end pr-3">
            {token && (
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img alt="Profile Picture" src="/user_avatar_default.png" />
                </div>
              </div>
            )}
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {/* Can maybe add Profile later if time permits */}
              {/* <li>
                <a className="justify-between">
                  Profile
                  {/* <span className="badge">New</span> */}
              {/* </a>
              </li>
              <li>
                <a>Settings</a>
              </li> */}
              <li>
                <NavLink to={"/log-out"}>Logout</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
