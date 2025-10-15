import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getEventByIdRequest, updateEventRequest } from "../utils/apiAccess";
import { useAuthContext } from "../contexts";
import { Loader2, ArrowLeft } from "lucide-react";

export default function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuthContext();

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // 🔹 Eventdaten laden
  useEffect(() => {
    async function fetchEvent() {
      try {
        setLoading(true);
        const result = await getEventByIdRequest(id);
        if (result.success && result.event) {
          const e = result.event;
          setFormData({
            title: e.title || "",
            date: e.date ? e.date.slice(0, 16) : "", // ISO → datetime-local kompatibel
            location: e.location || "",
            description: e.description || "",
          });
        } else {
          setError(result.error || "Event konnte nicht geladen werden.");
        }
      } catch (err) {
        console.error("Fehler beim Laden des Events:", err);
        setError("Ein unerwarteter Fehler ist aufgetreten.");
      } finally {
        setLoading(false);
      }
    }

    fetchEvent();
  }, [id]);

  // 🔹 Formular absenden
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setSaving(true);
      const result = await updateEventRequest(id, formData, token);
      if (result.success) {
        navigate(`/events/${id}`);
      } else {
        alert(result.error || "Update fehlgeschlagen!");
      }
    } catch (err) {
      console.error("Fehler beim Update:", err);
      alert("Ein unerwarteter Fehler ist aufgetreten.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="animate-spin w-8 h-8 text-primary" />
        <span className="ml-2 text-lg">Event wird geladen...</span>
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

  return (
    <div className="max-w-2xl mx-auto mt-12 card bg-base-100 shadow-lg border border-base-200">
      <div className="card-body space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">Event bearbeiten</h1>
          <Link
            to={`/events/${id}`}
            className="btn btn-ghost btn-sm flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" /> Zurück
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Titel</span>
            </label>
            <input
              type="text"
              name="title"
              className="input input-bordered w-full"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Datum & Uhrzeit</span>
            </label>
            <input
              type="datetime-local"
              name="date"
              className="input input-bordered w-full"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Ort</span>
            </label>
            <input
              type="text"
              name="location"
              className="input input-bordered w-full"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Beschreibung</span>
            </label>
            <textarea
              name="description"
              className="textarea textarea-bordered h-32"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className={`btn btn-primary ${saving ? "btn-disabled" : ""}`}
            >
              {saving ? (
                <>
                  <Loader2 className="animate-spin w-4 h-4 mr-2" /> Wird
                  gespeichert...
                </>
              ) : (
                "Änderungen speichern"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
