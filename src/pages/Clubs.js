import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Body from "../components/Body";
import "../styles/pages/_clubs.scss";
import { useNavigate } from "react-router-dom";

const Clubs = () => {
  const navigate = useNavigate();
  const [clubs, setClubs] = useState([
    {
      id: 1,
      name: "Coputer Club",
      logo: "/images/clubs/computer_club.png",
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
      name: "Coputer Club",
      logo: "/images/clubs/computer_club.png",
    },
    {
      id: 3,
      name: "Coputer Club",
      logo: "/images/clubs/computer_club.png",
    },
    {
      id: 4,
      name: "Coputer Club",
      logo: "/images/clubs/computer_club.png",
    },
    {
      id: 5,
      name: "Coputer Club",
      logo: "/images/clubs/computer_club.png",
    },
    {
      id: 6,
      name: "Coputer Club",
      logo: "/images/clubs/computer_club.png",
    },
  ]);

  const handleRemoveClub = (id) => {
    setClubs(clubs.filter((club) => club.id !== id));
  };

  //   const handleEditClub = (id) => {
  //     alert(`Editing Club with ID: ${id}`);
  //   };

  const handleAddNewClub = () => {
    alert("Navigate to Add New Club page.");
  };

  return (
    <Body>
      <div className="clubs-page">
        <header>
          <h1>Clubs</h1>
          <Button variant="primary" onClick={handleAddNewClub}>
            Add New Club
          </Button>
        </header>

        <div className="clubs-grid">
          {clubs.map((club) => (
            <div className="club-card" key={club.id}>
              <img
                src={club.logo}
                alt={`${club.name} Logo`}
                className="club-logo"
              />
              <h3>{club.name}</h3>
              <div className="buttons">
                <Button
                  variant="primary"
                  onClick={() => navigate("/edit-club", { state: { club } })}
                >
                  Edit
                </Button>

                <Button
                  variant="danger"
                  onClick={() => handleRemoveClub(club.id)}
                >
                  Remove
                </Button>
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
