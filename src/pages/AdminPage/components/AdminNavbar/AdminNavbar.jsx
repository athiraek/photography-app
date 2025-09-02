import { Link } from "react-router-dom";
import "./AdminNavbar.css";

export default function AdminNavbar() {
  return (
    <nav className="admin-navbar">
      <h2 className="logo">Admin Panel</h2>
      <ul className="nav-links">
        <li><Link to="/voraAdmin">Dashboard</Link></li>
        <li><Link to="/admin/hero">Home</Link></li>
        <li><Link to="/admin/about">About</Link></li>
        <li><Link to="/admin/gallery">Gallery</Link></li>
        <li><Link to="/admin/testimonial">Testimonials</Link></li>
      </ul>
    </nav>
  );
}
