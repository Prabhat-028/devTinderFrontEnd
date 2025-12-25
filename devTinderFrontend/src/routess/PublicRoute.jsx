import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
    const isLoggedIn = useSelector((store) => store.auth.isLoggedIn);

    return isLoggedIn ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicRoute;
