import { NavLink } from "react-router-dom";
import { CalendarDays, LayoutDashboard, PlusCircle } from "lucide-react";

function Navbar() {
  return (
    <header className="navbar">
      <div className="nav-container">

        <NavLink to="/" className="brand">
          <div className="brand-icon">
            <CalendarDays size={23} />
          </div>

          <span>
            Event<span className="brand-highlight">Nest</span>
          </span>
        </NavLink>

        <nav className="nav-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>

          <NavLink
            to="/add-event"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            <PlusCircle size={18} />
            Add Event
          </NavLink>
        </nav>

      </div>
    </header>
  );
}

export default Navbar;