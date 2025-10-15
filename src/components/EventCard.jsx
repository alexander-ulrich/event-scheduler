// src/components/EventCard.jsx
import { CalendarDays, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export default function EventCard({ event }) {
  const formattedDate = new Date(event.date).toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="card bg-base-100 min-h-100 shadow-md hover:shadow-lg border border-base-200 transition-all duration-300 rounded-2xl">
      {/* Card Body */}
      <div className="card-body p-6 space-y-4">
        {/* Titel */}
        <h2 className="card-title text-primary text-xl line-clamp-2">
          {event.title}
        </h2>

        {/* Datum & Ort */}
        <div className="space-y-2 text-sm text-base-content/80">
          <p className="flex items-center gap-2">
            <CalendarDays className="w-4 h-4 text-primary" />
            <span>{formattedDate}</span>
          </p>
          <p className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-secondary" />
            <span>{event.location}</span>
          </p>
        </div>

        {/* Beschreibung */}
        <p className="text-base-content/70 leading-relaxed line-clamp-3">
          {event.description || "Keine Beschreibung vorhanden."}
        </p>

        {/* Actions */}
        <div className="card-actions justify-end pt-4">
          <Link
            to={`/events/${event.id}`}
            className="btn btn-sm btn-outline btn-primary"
          >
            Mehr erfahren
          </Link>
        </div>
      </div>
    </div>
  );
}
