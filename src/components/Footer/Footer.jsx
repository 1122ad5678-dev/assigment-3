import './Footer.css';
import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-main">
        <div className="footer-grid">
          <div className="footer-brand">
            <h4>University Admin</h4>
            <p className="brand-desc">Manage students, teachers, schedules and materials with ease.</p>
            <div className="socials">
              <a href="#" aria-label="Facebook"><FaFacebookF /></a>
              <a href="#" aria-label="Twitter"><FaTwitter /></a>
              <a href="#" aria-label="LinkedIn"><FaLinkedinIn /></a>
            </div>
          </div>

          <div className="footer-col">
            <h5>Product</h5>
            <ul>
              <li><a href="#">Overview</a></li>
              <li><a href="#">Features</a></li>
              <li><a href="#">Pricing</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h5>Resources</h5>
            <ul>
              <li><a href="#">Docs</a></li>
              <li><a href="#">Support</a></li>
              <li><a href="#">API</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h5>Company</h5>
            <ul>
              <li><a href="#">About</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h5>Legal</h5>
            <ul>
              <li><a href="#">Privacy</a></li>
              <li><a href="#">Terms</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-inner">
        <div>© {new Date().getFullYear()} University Admin. All rights reserved.</div>
        <div className="footer-links">
          <a href="#">Status</a>
          <a href="#">Security</a>
          <a href="#">Contact</a>
        </div>
      </div>
    </footer>
  );
}
