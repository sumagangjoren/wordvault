import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../context/authContext';

export default function PrivateRoute() {
  const { session, loading } = useAuthContext();

  // 1. Still checking Supabase?
  if (loading) return <div>Loading...</div>;

  // 2. After loading → check logged in or not
  return session ? <Outlet /> : <Navigate to="/login" />;
}
