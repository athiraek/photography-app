// /pages/AdminPage.jsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabaseClient';
import AdminLogin from '../AdminPage/components/Login/AdminLogin';
import AdminDashboard from '../AdminPage/components/dashboard/AdminDashboard';

export default function AdminPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data?.user));
  }, []);

  return (
    <div>
      {user ? (
        <AdminDashboard onLogout={() => setUser(null)} />
      ) : (
        <AdminLogin onLogin={(user) => setUser(user)} />
      )}
    </div>
  );
}
