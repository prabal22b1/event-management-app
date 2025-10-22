import { Navigate,useLocation } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ children, requiredRole=null }) => {
    const { isAuthenticated, user,loading } = useAuth();
    const location = useLocation();
    
    if(loading){
        return <div className="flex justify-center items-center min-h-screen" >Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (requiredRole && user.role !== requiredRole) {
        return <Navigate to="/unauthorized" replace />;
    }
    
    return children;
};

export default ProtectedRoute;