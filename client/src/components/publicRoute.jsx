import { Navigate, Outlet } from "react-router";
import { useAuthContext } from "../context/authContext";

export default function PublicRoute() {

    const {session} = useAuthContext();

    return !session ? <Outlet /> : <Navigate to="/" />;
}