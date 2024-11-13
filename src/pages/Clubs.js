import React, {useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import Body from "../components/Body";
import "../styles/pages/_clubs.scss";
import { useNavigate } from "react-router-dom";

const Clubs = () => {
  const [isAdminView,setAdminView] = useState(false);
  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    if (storedRole && (storedRole.trim() === 'admin')) {
      setAdminView(true);
    }
  }, []);//frame 10 is false 21 true
  const navigate = useNavigate();
  const [filter, setFilter] = useState("");
  const [clubs, setClubs] = useState([
    {
      id: 1,
      name: "Computer Club",
      logo: "/images/clubs/computer_club.png",
      status: "following",
      email: "cc@kfupm.hub",
      number: "111",
      social: "@CC_KFUPM",
      leader: "Omar",
      members: [
        {
          id: 1,
          name: "Omar",
          role: "Vice Precident",
          profilePicture: "/images/clubMembers/omar.jpeg",
        },
        { id: 2, name: "Mohammed", role: "Member", profilePicture: "" },
      ],
    },

    {
      id: 2,
      name: "Computer Club",
      logo: "/images/clubs/computer_club.png",
      status: "following",
    },
    {
      id: 3,
      name: "Computer Club",
      logo: "/images/clubs/computer_club.png",
      status: "follow",
    },
    {
      id: 4,
      name: "Computer Club",
      logo: "/images/clubs/computer_club.png",
      status: "following",
    },
    {
      id: 5,
      name: "Computer Club",
      logo: "/images/clubs/computer_club.png",
      status: "follow",
    },
    {
      id: 6,
      name: "Computer Club",
      logo: "/images/clubs/computer_club.png",
      status: "enrolled",
    },
  ]);

  const [clubStatuses, setClubStatuses] = useState(
    clubs.map((club) => club.status)
  );

  const filteredClubs = clubs.filter((club, index) => {
    if (filter === "following") return clubStatuses[index] === "following";
    if (filter === "enrolled") return clubStatuses[index] === "enrolled";
    return true;
  });

  const handleFollowClick = (index) => {
    const updatedStatuses = [...clubStatuses];
    updatedStatuses[index] =
      updatedStatuses[index] === "follow" ? "following" : "follow";
    setClubStatuses(updatedStatuses);
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
                  className={`filter-btn ${
                    filter === "following" ? "active" : ""
                  }`}
                  onClick={() =>
                    setFilter(
                      filter === "" || filter === "enrolled" ? "following" : ""
                    )
                  }
                >
                  Following
                </Button>
                <Button
                  className={`filter-btn ${
                    filter === "enrolled" ? "active" : ""
                  }`}
                  onClick={() =>
                    setFilter(
                      filter === "" || filter === "following" ? "enrolled" : ""
                    )
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
              style={{ cursor: "pointer" }} // Adds a pointer cursor to indicate clickability
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
                        e.stopPropagation(); // Prevents parent onClick from firing
                        navigate("/edit-club", { state: { club } });
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevents parent onClick from firing
                        setClubs(clubs.filter((_, i) => i !== index));
                      }}
                    >
                      Remove
                    </Button>
                  </>
                ) : (
                  <Button
                    className={`club-action-btn ${clubStatuses[index]}`}
                    onClick={(e) => {
                      e.stopPropagation(); // Prevents parent onClick from firing
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
