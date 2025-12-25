import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const isLoggedIn = useSelector((store) => store.auth.isLoggedIn);

    return isLoggedIn ? <Outlet /> : <Navigate to="/signup" replace />;
};

export default ProtectedRoute;
