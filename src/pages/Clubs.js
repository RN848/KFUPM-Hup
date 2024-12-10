// Clubs.js
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Body from "../components/Body";
import "../styles/pages/_clubs.scss";
// Removed the incorrect import of defaultLogo from public
import { useNavigate } from "react-router-dom";
import {
  getAllClubs,
  deleteClub
} from "../api/apiClubService"; // Importing necessary club APIs
import {
  followClub,
  unfollowClub,
  getFollowedClubs
} from "../api/apiUserService"; // Importing necessary user APIs

const Clubs = () => {
  const [isAdminView, setAdminView] = useState(false);
  const [clubs, setClubs] = useState([]);
  const [clubStatuses, setClubStatuses] = useState({}); // Changed to object
  const [filter, setFilter] = useState("");
  const [error, setError] = useState(null); // Error state
  const [message, setMessage] = useState(null); // Success/Error messages
  const navigate = useNavigate();

  // Check if the user is an admin and fetch clubs
  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    if (storedRole && storedRole.trim() === "admin") {
      setAdminView(true);
    }

    // Fetch clubs data using apiClubService
    const fetchClubs = async () => {
      try {
        const followedClubsResponse = await getFollowedClubs(); // Fetch followed clubs
        const followedClubIds = new Set(followedClubsResponse.data.map((club) => club._id));

        const clubsData = await getAllClubs(); // Fetch all clubs
        setClubs(clubsData); // Set clubs data

        // Initialize the statuses based on followed clubs
        const initialStatuses = {};
        clubsData.forEach((club) => {
          initialStatuses[club._id] = followedClubIds.has(club._id) ? "following" : "follow";
        });
        setClubStatuses(initialStatuses);
      } catch (error) {
        console.error("Error fetching clubs:", error);
        setError("Failed to load clubs. Please try again later.");
      }
    };

    fetchClubs();
  }, []);

  // Filter clubs based on follow status
  const filteredClubs = clubs.filter((club) => {
    if (filter === "following") return clubStatuses[club._id] === "following";
    return true; // Show all if no filter
  });

  // Toggle club follow status
  const handleFollowClick = async (clubId) => {
    const currentStatus = clubStatuses[clubId];
    const updatedStatuses = { ...clubStatuses };
    updatedStatuses[clubId] = currentStatus === "follow" ? "following" : "follow";
    setClubStatuses(updatedStatuses);

    try {
      if (currentStatus === "follow") {
        await followClub(clubId); // API call to follow
        const clubName = clubs.find(club => club._id === clubId)?.name || "the club";
        setMessage(`You are now following ${clubName}.`);
      } else {
        await unfollowClub(clubId); // API call to unfollow
        const clubName = clubs.find(club => club._id === clubId)?.name || "the club";
        setMessage(`You have unfollowed ${clubName}.`);
      }
    } catch (error) {
      console.error("Error updating club status:", error);
      setError("Failed to update follow status. Please try again.");
      // Revert the status if API call fails
      updatedStatuses[clubId] = currentStatus;
      setClubStatuses(updatedStatuses);
    }

    // Clear messages after 3 seconds
    setTimeout(() => {
      setMessage(null);
      setError(null);
    }, 3000);
  };

  // Handle removing a club (for admins)
  const handleRemoveClub = async (clubId) => {
    // Optimistically remove the club from UI
    const updatedClubs = clubs.filter((club) => club._id !== clubId);
    const updatedStatuses = { ...clubStatuses };
    delete updatedStatuses[clubId];
    setClubs(updatedClubs);
    setClubStatuses(updatedStatuses);

    try {
      await deleteClub(clubId); // API call to delete
      setMessage("Club removed successfully.");
    } catch (error) {
      console.error("Error deleting club:", error);
      setError("Failed to delete the club. Please try again.");
      // Revert UI changes if API call fails
      setClubs(clubs);
      setClubStatuses({ ...clubStatuses, [clubId]: "follow" }); // Assuming it was 'follow'
    }

    // Clear messages after 3 seconds
    setTimeout(() => {
      setMessage(null);
      setError(null);
    }, 3000);
  };

  return (
      <Body>
        <div className="clubs-page">
          <header className="d-flex justify-content-between align-items-center mb-4">
            <div className="d-flex container-fluid flex-column">
              <div>
                <h1 className="d-inline me-3">Clubs</h1>
              </div>
              {!isAdminView && (
                  <div className="news-filter d-inline">
                    <Button
                        variant={filter === "following" ? "primary" : "outline-primary"}
                        className="me-2"
                        onClick={() =>
                            setFilter(filter === "following" ? "" : "following")
                        }
                    >
                      Following
                    </Button>
                  </div>
              )}
            </div>
            {isAdminView && (
                <Button
                    variant="primary"
                    onClick={() => navigate("/new-club")}
                >
                  Add New Club
                </Button>
            )}
          </header>

          {/* Display success or error messages */}
          {message && <Alert variant="success">{message}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}

          <div className="clubs-grid">
            {filteredClubs.map((club) => (
                <div
                    className="club-card p-2"
                    key={club._id} // Ensure using _id
                    onClick={() =>
                        navigate("/club-profile", { state: { clubId: club._id } })
                    }
                    style={{ cursor: "pointer", position: "relative" }}
                >
                  <img
                      src={club.clubPicture || "/images/clubs/computer_club.png"} // Fallback image
                      alt={`${club.name} Logo`}
                      className="club-logo mb-2"
                      onError={(e) => {
                        e.target.onerror = null; // Prevent infinite loop if default image also fails
                        e.target.src = "/images/clubs/computer_club.png"; // Set fallback image
                      }}
                  />
                  <h3 className="club-name">{club.name}</h3>
                  <div className="buttons">
                    {isAdminView ? (
                        <>
                          <Button
                              variant="primary"
                              className="me-2"
                              onClick={(e) => {
                                e.stopPropagation(); // Prevent card navigation
                                navigate("/edit-club", { state: { club } });
                              }}
                          >
                            Edit
                          </Button>
                          <Button
                              variant="danger"
                              onClick={(e) => {
                                e.stopPropagation(); // Prevent card navigation
                                handleRemoveClub(club._id);
                              }}
                          >
                            Remove
                          </Button>
                        </>
                    ) : (
                        <Button
                            variant={clubStatuses[club._id] === "follow" ? "outline-primary" : "primary"}
                            className="club-action-btn"
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent card navigation
                              handleFollowClick(club._id); // Pass clubId instead of index
                            }}
                        >
                          {clubStatuses[club._id] === "follow" ? "Follow" : "Following"}
                        </Button>
                    )}
                  </div>
                </div>
            ))}
          </div>

          {/* Back Button */}
          <div className="d-flex justify-content-center mt-4">
            <Button variant="secondary" onClick={() => navigate(-1)}>
              Back
            </Button>
          </div>
        </div>
      </Body>
  );
};

export default Clubs;
