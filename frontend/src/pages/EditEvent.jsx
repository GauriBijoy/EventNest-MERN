import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Pencil, ArrowLeft } from "lucide-react";

import EventForm from "../components/EventForm";
import api from "../services/api";

function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadEvent = async () => {
      try {
        const response = await api.get(`/events/${id}`);

        setEvent(response.data);
      } catch (err) {
        console.error(err);
        setError("Unable to load this event.");
      } finally {
        setLoading(false);
      }
    };

    loadEvent();
  }, [id]);

  const updateEvent = async (formData) => {
    setSubmitting(true);

    try {
      await api.put(`/events/${id}`, formData);

      navigate("/");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main className="page-container">
        <p>Loading event details...</p>
      </main>
    );
  }

  if (error || !event) {
    return (
      <main className="page-container">
        <h2>Event unavailable</h2>
        <p>{error}</p>

        <Link to="/" className="primary-btn">
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>
      </main>
    );
  }

  return (
    <main className="page-container">
      <div className="form-page-heading">
        <div className="form-heading-icon">
          <Pencil size={27} />
        </div>

        <p className="eyebrow">EVENT MANAGEMENT</p>

        <h1>Edit Event</h1>

        <p>
          Update the information for your selected event.
        </p>
      </div>

      <div className="form-card">
        <div className="form-card-header">
          <h2>Update Event Details</h2>
          <p>Make your changes and save the event.</p>
        </div>

        <EventForm
          initialValues={event}
          onSubmit={updateEvent}
          buttonText="Save Changes"
          submitting={submitting}
        />
      </div>
    </main>
  );
}

export default EditEvent;