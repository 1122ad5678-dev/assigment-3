import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">🏫</span>
          University Admin
        </Link>
        <div className="navbar-menu">
          <span className="user-info">Admin Dashboard</span>
        </div>
      </div>
    </nav>
  );
}
