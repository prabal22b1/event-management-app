import { Navigate } from "react-router-dom";


const ProtectedRoute = ({ children, requiredRole = null }) => {
    const token = localStorage.getItem("accessToken");
    const user_role_raw = localStorage.getItem("user_role");

    if (!token) {
    // if no token → redirect to login
    return <Navigate to="/login" replace />;
  }

    if (requiredRole) {
      // normalize required roles to an array of lowercase strings
      const roles = (Array.isArray(requiredRole) ? requiredRole : [requiredRole]).map(r => String(r).toLowerCase().trim());

      // Parse stored user role which might be plain string, JSON string, array or object
      let userRoles = [];
      if (user_role_raw) {
        userRoles = [String(user_role_raw).toLowerCase().trim()];
      }

      const hasRole = userRoles.some(ur => roles.includes(ur));
      if (!hasRole) {
        return <Navigate to="/unauthorized" replace />;
      }
    }

    return children;
};

export default ProtectedRoute;