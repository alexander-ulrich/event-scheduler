import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getEventByIdRequest, deleteEventRequest } from "../utils/apiAccess";
import { useAuthContext } from "../contexts";
import { CalendarDays, MapPin, Loader2, Trash2, Pencil } from "lucide-react";

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuthContext();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    async function fetchEvent() {
      try {
        setLoading(true);
        const result = await getEventByIdRequest(id);
        if (result.success) {
          setEvent(result.event);
        } else {
          setError(result.error || "Event konnte nicht geladen werden.");
        }
      } catch (err) {
        setError("Ein unerwarteter Fehler ist aufgetreten.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchEvent();
  }, [id]);

  async function handleDelete() {
    if (!window.confirm("Möchtest du dieses Event wirklich löschen?")) return;
    try {
      setDeleting(true);
      const result = await deleteEventRequest(id, token);
      if (result.success) {
        navigate("/");
      } else {
        alert(result.error || "Löschen fehlgeschlagen!");
      }
    } catch (err) {
      alert("Ein unerwarteter Fehler ist aufgetreten.");
    } finally {
      setDeleting(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="animate-spin w-8 h-8 mr-3 text-primary" />
        <span className="text-lg">Event wird geladen...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error max-w-lg mx-auto mt-8">
        <span>{error}</span>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="text-center mt-12">
        <h2 className="text-xl font-semibold">Event nicht gefunden.</h2>
        <Link to="/" className="btn btn-link mt-4">
          Zurück zur Startseite
        </Link>
      </div>
    );
  }

  const formattedDate = new Date(event.date).toLocaleDateString("de-DE", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="max-w-3xl mx-auto my-50 card bg-base-100 shadow-lg border border-base-200">
      <div className="card-body space-y-6">
        {/* Titel */}
        <h1 className="text-3xl font-bold text-primary">{event.title}</h1>

        {/* Datum & Ort */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-base-content/80 gap-2">
          <p className="flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-primary" />
            <span>{formattedDate}</span>
          </p>
          <p className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-secondary" />
            <span>{event.location}</span>
          </p>
        </div>

        {/* Beschreibung */}
        <p className="leading-relaxed text-base-content/70 whitespace-pre-line">
          {event.description || "Keine Beschreibung vorhanden."}
        </p>

        {/* Buttons (nur für eingeloggte Nutzer sichtbar) */}
        {token && (
          <div className="card-actions justify-end pt-4">
            <Link
              to={`/events/${id}/edit`}
              className="btn btn-outline btn-primary btn-sm flex items-center gap-2"
            >
              <Pencil className="w-4 h-4" />
              Bearbeiten
            </Link>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="btn btn-outline btn-error btn-sm flex items-center gap-2"
            >
              {deleting ? (
                <>
                  <Loader2 className="animate-spin w-4 h-4" /> Wird gelöscht...
                </>
              ) : (
                <>
                  <Trash2 className="w-4 h-4" /> Löschen
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
