import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../context/authContext';

export default function PrivateRoute() {
    const { session, loading } = useAuthContext();

    // 1. Still checking Supabase?
    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin mx-auto mb-4"></div>
                    <h2 className="text-xl font-semibold text-slate-800">WordVault</h2>
                    <p className="text-slate-500 text-sm mt-2">Loading...</p>
                </div>
            </div>
        );
    }

    // 2. After loading → check logged in or not
    return session ? <Outlet /> : <Navigate to="/login" />;
}