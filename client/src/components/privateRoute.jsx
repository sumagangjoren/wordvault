import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../context/authContext';

export default function PrivateRoute() {
    const { session } = useAuthContext();

    // if (!session) {
    //     return <div>Loading...</div>;
    // }

    return session ? <Outlet /> : <Navigate to="/login" />;
}