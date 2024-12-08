import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Body from "../components/Body";
import "../styles/pages/_clubs.scss";
import { useNavigate } from "react-router-dom";
import { getAllClubs, updateClub, deleteClub } from "../api/apiClubService"; // Correct import for named exports

const Clubs = () => {
  const [isAdminView, setAdminView] = useState(false);
  const [clubs, setClubs] = useState([]);
  const [clubStatuses, setClubStatuses] = useState([]);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  // Check if the user is an admin
  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    if (storedRole && storedRole.trim() === "admin") {
      setAdminView(true);
    }

    // Fetch clubs data using apiClubService
    const fetchClubs = async () => {
      try {
        const clubsData = await getAllClubs(); // Fetch clubs using the service
        setClubs(clubsData); // Assuming response.data contains the list of clubs
        setClubStatuses(clubsData.map((club) => club.status || "follow")); // Initialize the statuses
      } catch (error) {
        console.error("Error fetching clubs:", error);
      }
    };

    fetchClubs();
  }, []);

  // Filter clubs based on following/enrolled
  const filteredClubs = clubs.filter((club, index) => {
    if (filter === "following") return clubStatuses[index] === "following";
    if (filter === "enrolled") return clubStatuses[index] === "enrolled";
    return true;
  });

  // Toggle club follow status
  const handleFollowClick = (index) => {
    const updatedStatuses = [...clubStatuses];
    updatedStatuses[index] = updatedStatuses[index] === "follow" ? "following" : "follow";
    setClubStatuses(updatedStatuses);

    // Update the club status in the API
    updateClub(clubs[index].id, { status: updatedStatuses[index] })
        .catch((error) => {
          console.error("Error updating club status:", error);
        });
  };

  // Handle removing a club (for admins)
  const handleRemoveClub = (clubId, index) => {
    setClubs(clubs.filter((_, i) => i !== index));

    // Delete the club using the API
    deleteClub(clubId).catch((error) => {
      console.error("Error deleting club:", error);
    });
  };

  return (
      <Body>
        <div className="clubs-page">
          <header>
            <div>
              <h1 style={{ display: "inline", marginRight: "15px" }}>Clubs</h1>
              {!isAdminView && (
                  <div className={"news-filter "}>
                    <Button
                        className={`filter-btn ${filter === "following" ? "active" : ""}`}
                        onClick={() =>
                            setFilter(filter === "" || filter === "enrolled" ? "following" : "")
                        }
                    >
                      Following
                    </Button>
                    <Button
                        className={`filter-btn ${filter === "enrolled" ? "active" : ""}`}
                        onClick={() =>
                            setFilter(filter === "" || filter === "following" ? "enrolled" : "")
                        }
                    >
                      Enrolled
                    </Button>
                  </div>
              )}
            </div>
            {isAdminView && (
                <Button
                    className="add-btn"
                    variant="primary"
                    onClick={() => navigate("/new-club")}
                >
                  Add New Club
                </Button>
            )}
          </header>

          <div className="clubs-grid">
            {filteredClubs.map((club, index) => (
                <div
                    className={"club-card p-2"}
                    key={club.id}
                    onClick={() =>
                        navigate("/club-profile", { state: { clubId: club.id } })
                    }
                    style={{ cursor: "pointer" }}
                >
                  <img
                      src={club.logo}
                      alt={`${club.name} Logo`}
                      className="club-logo"
                  />
                  <h3>{club.name}</h3>
                  <div className="buttons">
                    {isAdminView ? (
                        <>
                          <Button
                              variant="primary"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate("/edit-club", { state: { club } });
                              }}
                          >
                            Edit
                          </Button>
                          <Button
                              variant="danger"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveClub(club.id, index);
                              }}
                          >
                            Remove
                          </Button>
                        </>
                    ) : (
                        <Button
                            className={`club-action-btn ${clubStatuses[index]}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleFollowClick(index);
                            }}
                        >
                          {clubStatuses[index] === "follow" ? "Follow" : "Following"}
                        </Button>
                    )}
                  </div>
                </div>
            ))}
          </div>

          <Button
              variant="secondary"
              className="back-button"
              onClick={() => window.history.back()}
          >
            Back
          </Button>
        </div>
      </Body>
  );
};

export default Clubs;
