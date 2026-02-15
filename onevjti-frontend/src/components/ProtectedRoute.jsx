import { Navigate } from "react-router-dom";
import api from "../api/axios";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ children }) => {
  const [authorized, setAuthorized] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.get("/users/current-user");
        setAuthorized(true);
      } catch {
        setAuthorized(false);
      }
    };

    checkAuth();
  }, []);
  if (authorized === null) return null;

  return authorized ? children : <Navigate to="/users/login" />;
};
export default ProtectedRoute;