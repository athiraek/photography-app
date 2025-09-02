// /components/ProtectedRoute.jsx
import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true); // while checking
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if a user is logged in
    supabase.auth.getUser().then(({ data }) => {
      setUser(data?.user || null);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  // If no user → send to login page
  if (!user) {
    return <Navigate to="/admin" />;
  }

  // If logged in → render the page
  return children;
}
