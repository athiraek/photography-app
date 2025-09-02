import { supabase } from "../../../../utils/supabaseClient";
import { Link } from "react-router-dom";
import AdminNavbar from "../AdminNavbar/AdminNavbar"; // adjust path
import "./AdminDashboard.css";

export default function AdminDashboard({ onLogout }) {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    onLogout();
  };

  return (
    <div className="admin-dashboard p-3">
      {/* Navbar */}
      <AdminNavbar />

      <div className="admin-header">
        <h2>Admin Dashboard</h2>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Sections */}
      <section className="admin-section">
        <h3>Home images Management</h3>
        <Link to="/admin/hero" className="admin-link">
          Go to Home
        </Link>
      </section>
      <section className="admin-section">
        <h3>About image Management</h3>
        <Link to="/admin/about" className="admin-link">
          Go to About
        </Link>
      </section>
      <section className="admin-section">
        <h3>Gallery Management</h3>
        <Link to="/admin/gallery" className="admin-link">
          Go to Gallery
        </Link>
      </section>
      <section className="admin-section">
        <h3>Testimonial Management</h3>
        <Link to="/admin/testimonial" className="admin-link">
          Go to Testimonials
        </Link>
      </section>
    </div>
  );
}
