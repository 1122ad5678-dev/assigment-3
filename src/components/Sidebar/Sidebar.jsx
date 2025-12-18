import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

export default function Sidebar() {
  const location = useLocation();

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <Link
          to="/"
          className={`nav-item ${isActive('/') && !isActive('/students') && !isActive('/teachers') && !isActive('/schedule') ? 'active' : ''}`}
        >
          <span className="icon">📊</span>
          <span>Dashboard</span>
        </Link>

        <div className="nav-section">
          <h3>Management</h3>
          <Link
            to="/students"
            className={`nav-item ${isActive('/students') ? 'active' : ''}`}
          >
            <span className="icon">👨‍🎓</span>
            <span>Students</span>
          </Link>

          <Link
            to="/teachers"
            className={`nav-item ${isActive('/teachers') ? 'active' : ''}`}
          >
            <span className="icon">👨‍🏫</span>
            <span>Teachers</span>
          </Link>

          <Link
            to="/schedule"
            className={`nav-item ${isActive('/schedule') ? 'active' : ''}`}
          >
            <span className="icon">📅</span>
            <span>Schedule</span>
          </Link>
        </div>
      </nav>
    </aside>
  );
}
