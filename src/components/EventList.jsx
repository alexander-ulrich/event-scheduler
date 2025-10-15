import { useEffect, useState } from "react";
import { getEventsRequest } from "../utils/apiAccess";
import EventCard from "./EventCard";

export default function EventList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        setLoading(true);
        setError(null);
        const result = await getEventsRequest();

        if (result.success) {
          const limitedEvents = result.events.slice(0, 6);
          setEvents(limitedEvents);
        } else {
          setError(result.error || "Failed to load events");
        }
      } catch (err) {
        setError("An unexpected error occurred");
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="loading loading-spinner loading-lg"></div>
        <span className="ml-4 text-lg">Loading events...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error max-w-md mx-auto">
        <span>{error}</span>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="text-center p-8">
        <h3 className="text-xl font-semibold mb-4">No Events Found</h3>
        <p className="text-base-content/70">
          There are currently no events to display.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event, index) => (
          <div
            key={event.id || event._id}
            className={`transform transition-transform duration-300 hover:scale-105 animate-fade-in`}
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            <EventCard event={event} />
          </div>
        ))}
      </div>
    </div>
  );
}
