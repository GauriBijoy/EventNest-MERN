import { useState } from "react";
import {
  CalendarDays,
  MapPin,
  FileText,
  Type,
  Save,
  ArrowLeft
} from "lucide-react";
import { Link } from "react-router-dom";

function EventForm({
  initialValues,
  onSubmit,
  buttonText,
  submitting
}) {
  const [formData, setFormData] = useState({
    eventName: initialValues.eventName || "",
    eventDescription: initialValues.eventDescription || "",
    eventDate: initialValues.eventDate || "",
    venue: initialValues.venue || ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(formData).some((value) => !value.trim())) {
      setError("Please fill in all the fields.");
      return;
    }

    setError("");

    try {
      await onSubmit(formData);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Something went wrong. Please try again."
      );
    }
  };

  return (
    <form className="event-form" onSubmit={handleSubmit}>
      {error && (
        <div className="form-error" role="alert">
          {error}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="eventName">
          <Type size={17} />
          Event Name
        </label>

        <input
          id="eventName"
          type="text"
          name="eventName"
          placeholder="e.g. Annual Tech Fest"
          value={formData.eventName}
          onChange={handleChange}
          maxLength={100}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="eventDescription">
          <FileText size={17} />
          Event Description
        </label>

        <textarea
          id="eventDescription"
          name="eventDescription"
          placeholder="Write a short description of your event..."
          value={formData.eventDescription}
          onChange={handleChange}
          rows={5}
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="eventDate">
            <CalendarDays size={17} />
            Event Date
          </label>

          <input
            id="eventDate"
            type="date"
            name="eventDate"
            value={formData.eventDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="venue">
            <MapPin size={17} />
            Venue
          </label>

          <input
            id="venue"
            type="text"
            name="venue"
            placeholder="e.g. Main Auditorium"
            value={formData.venue}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="form-actions">
        <Link to="/" className="secondary-btn">
          <ArrowLeft size={18} />
          Cancel
        </Link>

        <button
          type="submit"
          className="primary-btn"
          disabled={submitting}
        >
          <Save size={18} />
          {submitting ? "Saving..." : buttonText}
        </button>
      </div>
    </form>
  );
}

export default EventForm;