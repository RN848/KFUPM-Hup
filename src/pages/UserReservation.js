import React, { useState, useEffect } from "react";
import Body from "../components/Body";
import { useNavigate } from "react-router-dom";
import ReservationDetails from "./ReservationDetails";
import axios from "axios";

const UserReservations = () => {
  const [createdReservations, setCreatedReservations] = useState([]);
  const [joinedReservations, setJoinedReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get(
            "http://localhost:5000/api/userRoutes",
            {
              headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            }
        );
        console.log(response  + "THIS IS THE DATA");
        setCreatedReservations(response.data.createdReservations || []);
        setJoinedReservations(response.data.joinedReservations || []);
      } catch (err) {
        console.error(
          "Error fetching reservations:",
          err.response || err.message
        );
        setError("Failed to load reservations.");
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  if (loading) return <p>Loading reservations...</p>;
  if (error) return <p>{error}</p>;

  const hasReservations =
    createdReservations.length > 0 || joinedReservations.length > 0;

  return (
    <Body>
      <div className="user-reservations">
        <h2>Your Reservations</h2>

        {hasReservations ? (
          <>
            <div>
              <h3>Created Reservations</h3>
              {createdReservations.length > 0 ? (
                createdReservations.map((reservation) => (
                  <ReservationDetails
                    key={reservation._id}
                    reservation={reservation}
                    isOwnerView={true}
                  />
                ))
              ) : (
                <p>You have not created any reservations yet.</p>
              )}
            </div>

            <div>
              <h3>Joined Reservations</h3>
              {joinedReservations.length > 0 ? (
                joinedReservations.map((reservation) => (
                  <ReservationDetails
                    key={reservation._id}
                    reservation={reservation}
                    isOwnerView={false}
                  />
                ))
              ) : (
                <p>You have not joined any reservations yet.</p>
              )}
            </div>
          </>
        ) : (
          <p>
            You have no reservations to display. Create or join a reservation to
            get started!
          </p>
        )}

        <div style={{ marginTop: "20px" }}>
          <button
            onClick={() => navigate("/new-reservation")}
            style={{ padding: "10px 20px", fontSize: "1rem" }}
          >
            Create New Reservation
          </button>
        </div>
      </div>
    </Body>
  );
};

export default UserReservations;
