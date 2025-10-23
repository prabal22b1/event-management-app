import { Navigate,useLocation } from "react-router-dom";


const ProtectedRoute = ({ children, requiredRole=null }) => {
    const token = localStorage.getItem("accessToken");
    const user_role = localStorage.getItem("user_role")

    if (!token) {
    // if no token → redirect to login
    return <Navigate to="/login" replace />;
  }

    if (requiredRole && user_role != requiredRole){
        return <Navigate to="/unauthorized" replace />
    }

    return children;
};

export default ProtectedRoute;