import React from "react";
import AdminHeroView from "./components/HeroUpload/HeroUpload";
import AdminNavbar from "../AdminNavbar/AdminNavbar";

function AdminHero() {
  return (
    <div>
      <AdminNavbar />

      <AdminHeroView />
    </div>
  );
}

export default AdminHero;
