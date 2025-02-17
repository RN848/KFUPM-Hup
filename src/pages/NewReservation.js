import React, { useState, useEffect } from "react";
import Body from "../components/Body";
import "../styles/main.css";
import "../styles/master.css";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/pages/_newReservation.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DatePicker from "react-datepicker";
import axios from "axios";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NewReservation = () => {
  const [sport, setSport] = useState({ filter: "" });
  const [reservationType, setReservationType] = useState("Public");
  const [selectedField, setSelectedField] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [reservedTimes, setReservedTimes] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [weekRange, setWeekRange] = useState({ start: null, end: null });
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;

  // Example sports
  const sportsList = [
    { name: "Basketball" },
    { name: "Football" },
    { name: "Tennis" },
    { name: "Volleyball" },
    { name: "Squash" },
    { name: "Badminton" },
  ];

  // Fields per sport
  const sportFields = {
    Basketball: ["Court 1", "Court 2", "Court 3"],
    Football: ["Field 1", "Field 2", "Field 3", "Field 4"],
    Tennis: ["Tennis Court 1", "Tennis Court 2"],
    Volleyball: ["Volleyball Court 1", "Volleyball Court 2"],
    Squash: ["Squash Court 1", "Squash Court 2", "Squash Court 3"],
    Badminton: [
      "Badminton Court 1",
      "Badminton Court 2",
      "Badminton Court 3",
      "Badminton Court 4",
    ],
  };

  // Time slots
  const allTimeSlots = [
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
    "7:00 PM",
    "8:00 PM",
    "9:00 PM",
    "10:00 PM",
    "11:00 PM",
  ];

  const fields = sport.filter ? sportFields[sport.filter] || [] : [];

  // Restrict date selection to the current week
  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const currentDay = today.getDay();
    const sunday = new Date(today);
    sunday.setDate(today.getDate() - currentDay);
    const saturday = new Date(today);
    saturday.setDate(today.getDate() + (6 - currentDay));
    setWeekRange({ start: sunday, end: saturday });
  }, []);

  // Fetch reserved times
  useEffect(() => {
    const fetchReservedTimes = async () => {
      if (sport.filter && selectedField && selectedDay) {
        try {
          const response = await axios.get(
            `${apiUrl}/reservationRoute/available-timeslots`,
            {
              params: {
                sport: sport.filter,
                field: selectedField,
                date: selectedDay.toISOString().split("T")[0],
              },
            }
          );
          setReservedTimes(response.data.reservedTimeSlots || []);
        } catch (err) {
          console.error("Error fetching reserved time slots:", err);
          setErrorMessage("Failed to fetch reserved time slots.");
        }
      }
    };
    fetchReservedTimes();
  }, [sport.filter, selectedField, selectedDay]);

  // Handle reservation
  const handleReserveClick = async () => {
    if (!selectedTime) {
      setErrorMessage("Please select a time slot.");
      return;
    }
    const token = localStorage.getItem("token");
    const reservationData = {
      sport: sport.filter,
      field: selectedField,
      date: selectedDay.toISOString().split("T")[0],
      time: selectedTime,
      type: reservationType,
    };
    try {
      const response = await axios.post(
        `${apiUrl}/reservationRoute`,
        `http://${process.env.REACT_APP_API_URL}/api/reservationRoute`,
        reservationData,
        { headers: { Authorization: `Bearer ${token}` } }
      );


      // Navigate to the success page with the reservationId
      navigate("/reservation-success", {
        state: { reservationId: response.data._id },
      });
    } catch (err) {
      console.error(
        "Error creating reservation:",
        err.response?.data || err.message
      );
      setErrorMessage(
        err.response?.data?.error || "Failed to create reservation."
      );
    }
  };

  // Check completeness
  const isFormComplete =
    sport.filter && reservationType && selectedField && selectedDay;

  return (
    <Body>
      <div className="new-reservation-page">
        <h1 className="page-title">New Reservation</h1>

        {/* Filter Buttons */}
        <div
          className="news-filter"
          style={{ marginBottom: "1px", justifyContent: "center" }}
        >
          {sportsList.map((s) => (
            <Button
              key={s.name}
              className={`filter-btn ${
                sport.filter === s.name ? "active" : ""
              }`}
              onClick={() =>
                setSport({ filter: sport.filter === s.name ? "" : s.name })
              }
            >
              {s.name}
            </Button>
          ))}
        </div>

        {/* ROW 1: Just the Date Picker in the center, no container */}
        <Row
          className="g-0"
          style={{ justifyContent: "center", marginBottom: "30px" }}
        >
          <Col md="auto" style={{ textAlign: "center" }}>
            <DatePicker
              selected={selectedDay}
              onChange={(date) => setSelectedDay(date)}
              minDate={new Date()}
              maxDate={weekRange.end}
              dateFormat="yyyy-MM-dd"
              placeholderText="Select a Date 📅"
            />
          </Col>
        </Row>

        {/* ROW 2: Fields & Time Slots in the .news-box container */}
        <div className="news-box">
          <Row className="wid-row g-3">
            {/* Fields */}
            <Col lg={6} md={12} className="wid-colum">
              <h2>Fields</h2>
              {fields.length === 0 ? (
                <p className="choose-sport">No sport selected</p>
              ) : (
                <div className="grid-layout" style={{ gap: "5px" }}>
                  {fields.map((field) => (
                    <Button
                      key={field}
                      variant={
                        selectedField === field ? "primary" : "secondary"
                      }
                      onClick={() => setSelectedField(field)}
                    >
                      {field}
                    </Button>
                  ))}
                </div>
              )}
            </Col>

            {/* Time Slots */}
            <Col lg={6} md={12} className="wid-colum">
              <h2>Time Slots</h2>
              <div className="time-slots-grid">
                {allTimeSlots.map((time) => (
                  <Button
                    key={time}
                    variant={
                      reservedTimes.includes(time)
                        ? "danger"
                        : selectedTime === time
                        ? "primary"
                        : "secondary"
                    }
                    onClick={() => setSelectedTime(time)}
                    disabled={!isFormComplete || reservedTimes.includes(time)}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </Col>
          </Row>

          {/* Error & Buttons */}
          {errorMessage && (
            <div style={{ color: "red", marginTop: "10px" }}>
              {errorMessage}
            </div>
          )}
          <div
            className="action-buttons"
            style={{
              display: "flex",
              gap: "20px",
              marginTop: "20px",
              justifyContent: "center",
            }}
          >
            <Button variant="primary" onClick={handleReserveClick}>
              Reserve
            </Button>
            <Button
              variant="secondary"
              onClick={() => navigate("/Sports-reservation")}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </Body>
  );
};

export default NewReservation;
