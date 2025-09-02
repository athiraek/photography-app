// Footer.jsx
import React from "react";
import "./Footer.css";
import logo from "./../../../../assets/img/logo_white.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <img src={logo} alt="Vora Logo" className="vora-logo" />
          <br />
          <p>
            Capturing your story with creativity and emotion — welcome to the
            art of visual storytelling.
          </p>
        </div>

        <div className="footer-nav">
          <h3>Navigation</h3>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/service">Services</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/gallery">Gallery</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        <div className="footer-contact">
          <h3>Contact</h3>
          <p>Email: voracreativeuae@gmail.com</p>
          <p>
            Phone: +971 568195839,
            <br />
            97588591328
          </p>
          <p>
            Location: Building 33, Al Khaleej Street Al Murar, Deira Dubai
            United Arab Emirates
          </p>
        </div>

        <div className="footer-social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a
              href="https://www.facebook.com/share/1AharxyFkc/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="ti-facebook"></i>
            </a>
            <a
              href="https://www.instagram.com/vora_creative?igsh=ZmVsbWVmcmxrcnFq&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="ti-instagram"></i>
            </a>
            <a
              href="https://youtube.com/@voracreative?si=mYgSPJ3Mg7DjTH12"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="ti-youtube"></i>
            </a>
            <a href="mailto:voracreativeuae@gmail.com">
              <i className="ti-email"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          <span className="copyright-footer">
            &copy; {new Date().getFullYear()} All rights reserved VORA | Powered
            by{" "}
          </span>

          <a
            href="https://www.aionespark.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Aione Spark TechHive LLP
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
