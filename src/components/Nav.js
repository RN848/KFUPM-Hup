//Nav.js
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";  // Make sure to use Link for routing

export default function Nav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // Track login status
  const navigate = useNavigate();  // For navigation

  // Check if the user is logged in by looking for an auth token
  useEffect(() => {
    const token = localStorage.getItem("authToken");  // Retrieve auth token from localStorage
    setIsLoggedIn(!!token);  // If token exists, user is logged in
  }, [localStorage.getItem("authToken")]);  // Depend on the token change

  const handleLogout = () => {
    // Remove the auth token and update the state
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);  // Update the logged-in state
    navigate("/login");  // Redirect user to the login page after logout
  };

  // Links for navigation, you can easily update this list as needed
  const linksList = [
    { key: 0, name: "Home", icon: faHouse, link: "/home" },
    { key: 1, name: "Create Activity News", icon: faHouse, link: "/Create-Activity-news" },
    { key: 2, name: "Manage Profile", icon: faHouse, link: "/Manage-Profile" },
    { key: 3, name: "Your Profile", icon: faHouse, link: "/Your-Profile" },
    { key: 4, name: "Login", icon: faHouse, link: "/login" },
    { key: 5, name: "Sign Up", icon: faHouse, link: "/Sign-Up" },
    { key: 6, name: "New Club", icon: faHouse, link: "/New-Club" },
    { key: 7, name: "Sports Reservation", icon: faHouse, link: "/Sports-reservation" },
    { key: 8, name: "Latest News", icon: faHouse, link: "/Latest-News" },
    { key: 9, name: "Edit Activity", icon: faHouse, link: "/edit-Activity" },
    { key: 10, name: "New Reservation", icon: faHouse, link: "/new-reservation" },
    { key: 11, name: "Reservation Success", icon: faHouse, link: "/reservaion-success" },
    { key: 12, name: "News Clubs", icon: faHouse, link: "/news-clubs" },
    { key: 13, name: "Activity View", icon: faHouse, link: "/activity-view" },
    { key: 14, name: "Reservation Details", icon: faHouse, link: "/reservation-details" },
    { key: 15, name: "Club Members", icon: faHouse, link: "/club-members" },
    { key: 16, name: "Member Profile", icon: faHouse, link: "/members-profile" },
    { key: 17, name: "Clubs", icon: faHouse, link: "/clubs" },
    { key: 18, name: "Edit Club", icon: faHouse, link: "/edit-club" },
    { key: 19, name: "Error", icon: faHouse, link: "/error" },
    { key: 20, name: "Club Profile", icon: faHouse, link: "/club-profile" },
    { key: 21, name: "Loading", icon: faHouse, link: "/loading" },
    { key: 22, name: "Club Leader Home Page", icon: faHouse, link: "/clubleaderHomePage" },
  ];

  // Render the navigation links
  const linkMap = linksList.map((nav) => {
    return (
      <Link key={nav.key} to={nav.link} className="link">
        <FontAwesomeIcon icon={nav.icon} size="1x" />
        <span>{nav.name}</span>
      </Link>
    );
  });

  return (
    <div className="navLinks">
      {linkMap}

      {/* Only show logout button if user is logged in */}
      {isLoggedIn && (
        <button className="logout-btn" onClick={handleLogout}>
          <FontAwesomeIcon icon={faSignOutAlt} size="1x" />
          <span>Logout</span>
        </button>
      )}
    </div>
  );
}
