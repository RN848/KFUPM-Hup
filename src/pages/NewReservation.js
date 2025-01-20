import React, { useState, useEffect } from "react";
import Body from "../components/Body";
import "../styles/main.css";
import "../styles/master.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Calendar from "react-calendar";
import { enUS } from "date-fns/locale";

import axios from "axios";
import {
  Image,
  Button,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import Basketball from "../images/sports/sport-1.jpg";
import Football from "../images/sports/sport-2.jpg";
import Tennis from "../images/sports/sport-3.jpg";
import Volleyball from "../images/sports/sport-4.jpg";
import Squash from "../images/sports/sport-5.jpg";
import Badminton from "../images/sports/sport-6.jpg";

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

  const sportsList = [
    { name: "Basketball", image: Basketball },
    { name: "Football", image: Football },
    { name: "Tennis", image: Tennis },
    { name: "Volleyball", image: Volleyball },
    { name: "Squash", image: Squash },
    { name: "Badminton", image: Badminton },
  ];

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

  // make one week ahead available
  useEffect(() => {
    // Get the current date
    const today = new Date();

    // Normalize today's date to the beginning of the day (00:00:00)
    today.setHours(0, 0, 0, 0);

    // Get the current day of the week (0 is Sunday, 6 is Saturday)
    const currentDay = today.getDay();

    // Calculate the current week's Sunday (start of the week)
    const sunday = new Date(today);
    sunday.setDate(today.getDate() - currentDay); // Subtract days to reach Sunday

    // Calculate the current week's Saturday (end of the week)
    const saturday = new Date(today);
    saturday.setDate(today.getDate() + (6 - currentDay)); // Add days to reach Saturday

    // Set the start and end of the week
    setWeekRange({ start: sunday, end: saturday });
  }, []);
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
        reservationData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log(
        "Navigating to Reservation Success with ID:",
        response.data._id
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

  const isFormComplete =
    sport.filter && reservationType && selectedField && selectedDay;

  return (
    <Body>
      <div className="body">
        <h1>New Reservation</h1>
        <Row
          className={"g-4 wid-row reverse"}
          style={{ marginBottom: "1.5em" }}
        >
          <Col lg={8} md={8} sm={12}>
            <div className={"wid-colum sports"}>
              {sportsList.map((s) => {
                const isActive = sport.filter === s.name;
                return (
                  <div key={s.name} className={isActive ? "focus" : ""}>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setSport({ filter: s.name });
                        setSelectedField(null);
                      }}
                    >
                      <Image className="img" src={s.image} alt={s.name} />
                    </a>
                    <span>{s.name}</span>
                  </div>
                );
              })}
            </div>
          </Col>
          <Col>
            <div
              className="wid-colum form"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "end",
              }}
            >
              <h4
                style={{
                  color: "white",
                  margin: "0 30px 50px 0",
                  fontSize: "2rem",
                }}
              >
                Type
              </h4>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <ToggleButtonGroup type="radio" name="type" vertical>
                  <ToggleButton
                    variant={
                      reservationType === "Public"
                        ? "primary"
                        : "outline-primary"
                    }
                    value="Public"
                    onClick={() => setReservationType("Public")}
                    style={{
                      textAlign: "center",
                      width: "100%",
                      padding: "10px 50px",
                      marginBottom: "20px",
                      fontSize: "1.25rem",
                      borderRadius: "10px",
                    }}
                  >
                    Public
                  </ToggleButton>
                  <ToggleButton
                    variant={
                      reservationType === "Private"
                        ? "primary"
                        : "outline-primary"
                    }
                    value="Private"
                    onClick={() => setReservationType("Private")}
                    style={{
                      textAlign: "center",
                      width: "100%",
                      padding: "10px 50px",
                      fontSize: "1.25rem",
                      borderRadius: "10px",
                    }}
                  >
                    Private
                  </ToggleButton>
                </ToggleButtonGroup>
              </div>
            </div>
          </Col>
        </Row>

        <Row className="g-4 wid-row" style={{ gap: "20px" }}>
          <Col className="wid-colum">
            <h2 style={{ color: "white" }}>Fields</h2>
            <div className="grid-layout">
              {fields.map((field) => (
                <Button
                  key={field}
                  variant={selectedField === field ? "primary" : "secondary"}
                  onClick={() => setSelectedField(field)}
                >
                  {field}
                </Button>
              ))}
            </div>
          </Col>
          {/*calendar*/}
          <Col className="wid-colum">
            <h2 style={{ color: "white" }}>Select a Date</h2>
            <Calendar
              locale={enUS}
              tileDisabled={({ date }) => {
                const today = new Date();
                // Disable past dates (before today)
                if (date < today.setHours(0, 0, 0, 0)) {
                  return true;
                }
                // Disable dates outside of this week (before Sunday or after Saturday)
                return date < weekRange.start || date > weekRange.end;
              }}
              onClickDay={(value) => setSelectedDay(value)}
            />
          </Col>

          <Col className="wid-colum">
            <h2 style={{ color: "white" }}>Time Slots</h2>
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
                  disabled={!isFormComplete || reservedTimes.includes(time)} // Disable if form is incomplete
                >
                  {time}
                </Button>
              ))}
            </div>
          </Col>
        </Row>

        {errorMessage && (
          <div style={{ color: "red", marginTop: "10px" }}>{errorMessage}</div>
        )}

        <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
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
    </Body>
  );
};

export default NewReservation;
