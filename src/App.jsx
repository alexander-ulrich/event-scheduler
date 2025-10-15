import { Routes, Route } from "react-router-dom"; // "react-router-dom" nutzen!
import MainLayout from "./layouts/MainLayout";
import ProtectedLayout from "./layouts/ProtectedLayout";

import Home from "./pages/Home";
import EventDetails from "./pages/EventDetails";
import CreateEvent from "./pages/CreateEvent";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import NotFound from "./pages/NotFound";
import LogOut from "./pages/LogOut";
import EditEvent from "./components/EditEvent";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {/* Öffentliche Seiten */}
        <Route index element={<Home />} />
        <Route path="events/:id" element={<EventDetails />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="log-out" element={<LogOut />} />

        {/* Geschützte Routen */}
        <Route element={<ProtectedLayout />}>
          <Route path="events/create-event" element={<CreateEvent />} />
          <Route path="events/:id/edit" element={<EditEvent />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
