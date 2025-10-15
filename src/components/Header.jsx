import { NavLink } from "react-router";
import { useAuthContext } from "../contexts/AuthContext";
import { Plus } from "lucide-react";

export default function Header() {
  const { token } = useAuthContext(); // In-Memory Auth token

  return (
    <header>
      <nav className="navbar bg-base-100 shadow-sm justify-between px-4">
        {/* Mobile Dropdown */}
        <div className="dropdown min-[590px]:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
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
              <>
                <li>
                  <NavLink to={"/sign-in"}>Login</NavLink>
                </li>
                <li>
                  <NavLink to={"/sign-up"}>Register</NavLink>
                </li>
              </>
            )}
            {token && (
              <li>
                <NavLink
                  to={"/events/create-event"}
                  className="flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  Neues Event
                </NavLink>
              </li>
            )}
          </ul>
        </div>

        {/* Desktop Navigation */}
        <div className="max-[590px]:hidden flex items-center gap-2">
          <NavLink to={"/"} className="btn btn-ghost text-xl">
            Home
          </NavLink>

          {/* Nur sichtbar wenn eingeloggter Benutzer */}
          {token && (
            <NavLink
              to={"/events/create-event"}
              className="btn btn-primary btn-sm flex items-center gap-1 px-3 py-1 text-sm"
            >
              <Plus className="w-4 h-4" />
              Neues Event
            </NavLink>
          )}

          {!token && (
            <>
              <NavLink to={"/sign-in"} className="btn btn-ghost text-xl">
                Login
              </NavLink>
              <NavLink to={"/sign-up"} className="btn btn-ghost text-xl">
                Register
              </NavLink>
            </>
          )}
        </div>

        {/* User Avatar / Dropdown */}
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
              {token && (
                <li>
                  <NavLink to={"/log-out"}>Logout</NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
