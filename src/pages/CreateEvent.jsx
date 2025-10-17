import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { useAuthContext } from "../contexts";
import { createEventRequest } from "../utils/apiAccess";
import { Plus, ArrowLeft } from "lucide-react";

export default function CreateEvent() {
  const { token } = useAuthContext();
  const navigate = useNavigate();
  const formRef = useRef();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState({
    event: null,
    error: null,
    success: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      setResult({
        event: null,
        error: "Du musst eingeloggt sein, um ein Event zu erstellen",
        success: false,
      });
      return;
    }

    try {
      setLoading(true);
      setResult({ event: null, error: null, success: false });
      const response = await createEventRequest(formData, token);
      setResult(response);

      if (response.success) {
        setFormData({ title: "", description: "", date: "", location: "" });
        formRef.current?.reset();
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (err) {
      setResult({
        event: null,
        error: "Ein Fehler ist aufgetreten. Bitte erneut versuchen.",
        success: false,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
        <div className="card bg-base-100 shadow-md border border-base-300">
          <div className="flex items-center mt-8 gap-4">
            <button
              onClick={() => navigate("/")}
              className="btn btn-ghost btn-sm flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" /> Zurück
            </button>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              Neues Event <Plus className="w-5 h-5 text-primary" />
            </h1>
          </div>
          <div className="card-body space-y-4">
            <div className="form-control">
              <label htmlFor="title" className="label">
                <span className="label-text font-semibold">Event-Titel *</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Gib einen Titel ein"
                className="input input-bordered w-full"
                required
                disabled={loading}
              />
            </div>

            <div className="form-control">
              <label htmlFor="description" className="label">
                <span className="label-text font-semibold">Beschreibung *</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Beschreibe dein Event"
                className="textarea textarea-bordered w-full h-28"
                required
                disabled={loading}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label htmlFor="date" className="label">
                  <span className="label-text font-semibold">
                    Datum & Uhrzeit *
                  </span>
                </label>
                <input
                  type="datetime-local"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                  required
                  disabled={loading}
                />
              </div>

              <div className="form-control">
                <label htmlFor="location" className="label">
                  <span className="label-text font-semibold">Ort *</span>
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Veranstaltungsort"
                  className="input input-bordered w-full"
                  required
                  disabled={loading}
                />
              </div>
            </div>
          </div>
        </div>

        {result.error && (
          <div className="alert alert-error">
            <span>{result.error}</span>
          </div>
        )}
        {result.success && (
          <div className="alert alert-success">
            <span>Event wurde erfolgreich erstellt!</span>
          </div>
        )}

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="btn btn-ghost"
            disabled={loading}
          >
            Abbrechen
          </button>
          <button
            type="submit"
            className="btn btn-primary flex items-center gap-2"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Event wird erstellt...
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" /> Event erstellen
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
