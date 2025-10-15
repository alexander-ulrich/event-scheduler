import { useAuthContext } from "../contexts";
import { Link } from "react-router";
import EventList from "../components/EventList";

export default function Home() {
  const { token } = useAuthContext();
  const isLoggedIn = !!token;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative mb-12">
        <div className="bg-black/70 p-6 rounded-lg shadow-lg inline-block animate-slide-in-left">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Neues Event +
          </h1>
          <p className="text-white/80 text-lg md:text-xl">
            Erstelle hier dein Event und teile es mit allen.
          </p>
        </div>
      </div>

      {!isLoggedIn && (
        <div className="alert alert-info mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-current shrink-0 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>
            <Link to="/sign-in" className="font-semibold underline">
              Einloggen
            </Link>{" "}
            um eigene Events anzulegen!
          </span>
        </div>
      )}

      <section>
        <h2 className="text-2xl font-semibold mb-6">Demnächst:</h2>
        <EventList />
      </section>
    </div>
  );
}
