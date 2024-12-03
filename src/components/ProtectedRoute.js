// rout

// components/ProtectedRoute.js
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ProtectedRoute = ({ element }) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    
    // If token doesn't exist, redirect to the login page
    if (!token) {
      navigate("/Log-In");
    }
  }, [navigate]);
  
  return element;  // Render the protected component
};

export default ProtectedRoute;
