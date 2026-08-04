import { companies } from '../data/content.js';
import logo from '../assets/mervix-logo.png';
import { Link, HashLink } from '../lib/router.jsx';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <div className="footer-logo">
            <img src={logo} alt="Mervix Technology" />
          </div>
          <p className="footer-blurb">
            A technology group uniting four specialist companies across SaaS, AI,
            infrastructure, and digital.
          </p>
        </div>
        <div>
          <div className="footer-col-title">THE GROUP</div>
          <div className="footer-links">
            {companies.map((c) => <HashLink key={c.name} to="#group">{c.name}</HashLink>)}
          </div>
        </div>
        <div>
          <div className="footer-col-title">COMPANY</div>
          <div className="footer-links">
            <HashLink to="#work">What we do</HashLink>
            <Link to="/case-studies">Case studies</Link>
            <Link to="/insights">Insights</Link>
            <HashLink to="#about">About</HashLink>
            <Link to="/careers">Careers</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
      </div>
      <div className="footer-base">
        <span>© 2026 Mervix Technology Pvt Ltd. All rights reserved.</span>
        <div className="footer-legal">
          <Link to="/terms-and-conditions">Terms &amp; Conditions</Link>
          <Link to="/privacy-policy">Privacy Policy</Link>
        </div>
        <span>Built across four companies, one vision.</span>
      </div>
    </footer>
  );
}
