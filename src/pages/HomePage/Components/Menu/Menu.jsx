import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../../assets/img/logo_white.png";
import "./Menu.css";
import { FaWhatsapp, FaFacebookF,  FaInstagram, FaYoutube } from "react-icons/fa";

const Menu = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* Offcanvas Menu Section */}
      <div className="menu-wrapper">
        <div className="menu-switch" onClick={toggleMenu}>
          <i className="ti-menu"></i>
        </div>
        <div className="menu-social-warp">
          <div className="menu-social">
            <a href="https://www.facebook.com/share/1AharxyFkc/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebookF />
            </a>

            <a href="https://wa.me/97588591328" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <FaWhatsapp />
            </a>

            <a href="https://youtube.com/@voracreative?si=mYgSPJ3Mg7DjTH12" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaYoutube />
            </a>

            <a href="https://www.instagram.com/vora_creative?igsh=ZmVsbWVmcmxrcnFq&utm_source=qr" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      <div className={`side-menu-wrapper ${menuOpen ? "active" : ""}`}>
        <div className="sm-header">
          <div className="menu-close" onClick={closeMenu}>
            <i className="ti-arrow-left"></i>
          </div>
          <Link to="/" className="site-logo">
            <img src={logo} alt="Site Logo" />
          </Link>
        </div>

        <nav className="main-menu">
          <ul>
            <li><Link to="/" onClick={closeMenu} className="active">Home</Link></li>
            <li><Link to="/about" onClick={closeMenu}>About</Link></li>
            <li><Link to="/gallery" onClick={closeMenu}>Gallery</Link></li>
            <li><Link to="/service" onClick={closeMenu}>Services</Link></li>
            <li><Link to="/contact" onClick={closeMenu}>Contact</Link></li>
          </ul>
        </nav>

        <div className="sm-footer">
          <div className="sm-socail">
            <a href="https://www.facebook.com/share/1AharxyFkc/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebookF />
            </a>

            <a href="https://wa.me/97588591328" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <FaWhatsapp />
            </a>

            <a href="https://www.instagram.com/vora_creative?igsh=ZmVsbWVmcmxrcnFq&utm_source=qr" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
          </div>
          <div className="copyright-text">
            <p>
              <span className="copyright-footer">
                &copy; {new Date().getFullYear()} All rights reserved VORA | Powered by{" "}
              </span>
              <br />
              <a href="https://www.aionespark.com" target="_blank" rel="noopener noreferrer">
                Aione Spark TechHive LLP
              </a>
            </p>
          </div>
        </div>
      </div>
      {/* Offcanvas Menu Section end */}
    </>
  );
};

export default Menu;
