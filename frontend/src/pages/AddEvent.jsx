import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlusCircle } from "lucide-react";

import EventForm from "../components/EventForm";
import api from "../services/api";

function AddEvent() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const initialValues = {
    eventName: "",
    eventDescription: "",
    eventDate: "",
    venue: ""
  };

  const createEvent = async (formData) => {
    setSubmitting(true);

    try {
      await api.post("/events", formData);

      navigate("/");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="page-container">
      <div className="form-page-heading">
        <div className="form-heading-icon">
          <PlusCircle size={27} />
        </div>

        <p className="eyebrow">EVENT MANAGEMENT</p>

        <h1>Create New Event</h1>

        <p>
          Bring your next event to life.
          Fill in the details below to get started.
        </p>
      </div>

      <div className="form-card">
        <div className="form-card-header">
          <h2>Event Details</h2>
          <p>All fields are required.</p>
        </div>

        <EventForm
          initialValues={initialValues}
          onSubmit={createEvent}
          buttonText="Create Event"
          submitting={submitting}
        />
      </div>
    </main>
  );
}

export default AddEvent;