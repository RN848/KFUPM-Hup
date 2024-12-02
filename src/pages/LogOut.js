// LogOut.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LogOut = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove token from localStorage on logout
    localStorage.removeItem("token");
    // Redirect to the login page
    navigate("/Log-In");
  }, [navigate]);

  return null; // You can show a loading indicator or something here if needed
};

export default LogOut;
