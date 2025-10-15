import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";

// MainLayout sorgt dafür, dass Header und Footer auf allen Seiten gleich sind
// Outlet rendert die aktuell aktive Route (z.B. Home, CreateEvent, EventDetails)
export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
