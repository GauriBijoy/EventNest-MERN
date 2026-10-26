import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  CalendarDays,
  Users,
  CalendarCheck,
  Plus,
  Pencil,
  Trash2,
  MapPin,
  ArrowRight,
} from "lucide-react";

import api from "../services/api";

function Dashboard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Load events from MongoDB
  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/events");

      setEvents(response.data);
    } catch (err) {
      console.error(err);
      setError("Unable to load events. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Delete event
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmed) return;

    try {
      await api.delete(`/events/${id}`);

      setEvents((previousEvents) =>
        previousEvents.filter((event) => event._id !== id)
      );
    } catch (err) {
      console.error(err);
      alert("Unable to delete event. Please try again.");
    }
  };

  // Format event date
  const formatDate = (date) => {
    if (!date) return "Not available";

    const [year, month, day] = date.split("-");

    return new Date(
      Number(year),
      Number(month) - 1,
      Number(day)
    ).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Dashboard statistics
  const totalEvents = events.length;

  const totalRegistrations = events.reduce(
    (sum, event) => sum + (event.totalRegistrations || 0),
    0
  );

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingEvents = events.filter((event) => {
    const eventDate = new Date(`${event.eventDate}T00:00:00`);

    return eventDate >= today;
  }).length;

  return (
    <main className="page-container">

      {/* Page heading */}
      <div className="page-heading">
        <div>
          <p className="eyebrow">EVENT MANAGEMENT</p>

          <h1>Event Dashboard</h1>

          <p className="page-description">
            A simple space to organize and manage your events.
          </p>
        </div>

        <Link to="/add-event" className="primary-btn">
          <Plus size={19} />
          Add New Event
        </Link>
      </div>

      {/* Statistics */}
      <section className="stats-grid">

        <div className="stat-card">
          <div className="stat-icon purple">
            <CalendarDays size={24} />
          </div>

          <div>
            <p>Total Events</p>
            <h2>{totalEvents}</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon green">
            <Users size={24} />
          </div>

          <div>
            <p>Total Registrations</p>
            <h2>{totalRegistrations}</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon orange">
            <CalendarCheck size={24} />
          </div>

          <div>
            <p>Upcoming Events</p>
            <h2>{upcomingEvents}</h2>
          </div>
        </div>

      </section>

      {/* Event table */}
      <section className="table-card">

        <div className="table-heading">
          <div>
            <h2>All Events</h2>
            <p>View and manage your scheduled events</p>
          </div>

          <span className="event-count">
            {totalEvents} Events
          </span>
        </div>

        {loading ? (
          <div className="empty-state">
            <p>Loading events...</p>
          </div>
        ) : error ? (
          <div className="empty-state">
            <p>{error}</p>

            <button
              className="primary-btn"
              onClick={fetchEvents}
            >
              Try Again
            </button>
          </div>
        ) : events.length === 0 ? (
          <div className="empty-state">
            <CalendarDays size={48} />

            <h3>No events yet</h3>

            <p>
              Create your first event to get started.
            </p>

            <Link to="/add-event" className="primary-btn">
              <Plus size={18} />
              Create Event
            </Link>
          </div>
        ) : (
          <div className="table-wrapper">

            <table className="event-table">
              <thead>
                <tr>
                  <th>Event ID</th>
                  <th>Event Name</th>
                  <th>Event Date</th>
                  <th>Venue</th>
                  <th>Registrations</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {events.map((event, index) => (
                  <tr key={event._id}>

                    <td>
                      <span className="event-id">
                        EVT-{String(index + 1).padStart(3, "0")}
                      </span>
                    </td>

                    <td>
                      <div className="event-name">
                        {event.eventName}
                      </div>
                    </td>

                    <td>
                      <div className="table-detail">
                        <CalendarDays size={16} />
                        {formatDate(event.eventDate)}
                      </div>
                    </td>

                    <td>
                      <div className="table-detail">
                        <MapPin size={16} />
                        {event.venue}
                      </div>
                    </td>

                    <td>
                      <span className="registration-badge">
                        {event.totalRegistrations || 0}
                      </span>
                    </td>

                    <td>
                      <div className="action-buttons">

                        <button
                          className="edit-btn"
                          title="Edit Event"
                          onClick={() =>
                            navigate(`/edit-event/${event._id}`)
                          }
                        >
                          <Pencil size={16} />
                          Edit
                        </button>

                        <button
                          className="delete-btn"
                          title="Delete Event"
                          onClick={() => handleDelete(event._id)}
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>

                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        )}

      </section>

      {/* Footer */}
      <footer className="footer">
        <span>© EventNest — Event Management Made Simple</span>

        <span>
          Built with MERN Stack <ArrowRight size={14} />
        </span>
      </footer>

    </main>
  );
}

export default Dashboard;