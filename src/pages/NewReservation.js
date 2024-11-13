import Body from "../components/Body";
import "../styles/main.css";
import "../styles/master.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  Image,
  Button,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Basketball from "../images/sports/sport-1.jpg";
import Football from "../images/sports/sport-2.jpg";
import tennis from "../images/sports/sport-3.jpg";
import Volleyball from "../images/sports/sport-4.jpg";
import Squash from "../images/sports/sport-5.jpg";
import Badminton from "../images/sports/sport-6.jpg";

const NewReservation = () => {
  const [sport, setSport] = useState({ filter: "" });
  const [reservationType, setReservationType] = useState("Public");
  const [selectedField, setSelectedField] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const sportsList = [
    { name: "Basketball", image: Basketball },
    { name: "Football", image: Football },
    { name: "tennis", image: tennis },
    { name: "Volleyball", image: Volleyball },
    { name: "Squash", image: Squash },
    { name: "Badminton", image: Badminton },
  ];

  const sportFields = {
    Basketball: ["Court 1", "Court 2", "Court 3"],
    Football: ["Field 1", "Field 2", "Field 3", "Field 4"],
    tennis: ["Tennis Court 1", "Tennis Court 2"],
    Volleyball: ["Volleyball Court 1", "Volleyball Court 2"],
    Squash: ["Squash Court 1", "Squash Court 2", "Squash Court 3"],
    Badminton: [
      "Badminton Court 1",
      "Badminton Court 2",
      "Badminton Court 3",
      "Badminton Court 4",
    ],
  };

  const fields = sport.filter ? sportFields[sport.filter] || [] : [];

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const availableTimes = {
    "Basketball|Court 1|Sunday": ["08:00", "10:00", "14:00", "16:00"],
    "Football|Field 1|Monday": ["09:00", "11:00", "15:00", "17:00"],
  };

  const allTimeSlots = [
    "00:00",
    "01:00",
    "02:00",
    "03:00",
    "04:00",
    "05:00",
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
  ];

  const isFormComplete =
    sport.filter && reservationType && selectedField && selectedDay;

  const selectedKey = `${sport.filter}|${selectedField}|${selectedDay}`;
  const timesForSelection = isFormComplete
    ? availableTimes[selectedKey] || []
    : [];

  const handleReserveClick = () => {
    if (!isFormComplete || !selectedTime) {
      setErrorMessage("Please complete all fields before reserving.");
    } else {
      setErrorMessage("");
      navigate("/reservaion-success");
    }
  };

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
                      href=""
                      onClick={(e) => {
                        e.preventDefault();
                        setSport({ filter: s.name });
                        setSelectedField(null);
                      }}
                    >
                      <Image className="img" src={s.image} alt={s.name}></Image>
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
          {/* Fields */}
          <Col className="wid-colum">
            <h2 style={{ color: "white" }}>Fields</h2>
            <div className="grid-layout">
              {fields.length > 0 ? (
                fields.map((field) => (
                  <Button
                    key={field}
                    variant={selectedField === field ? "primary" : "secondary"}
                    onClick={() => setSelectedField(field)}
                    className="grid-button"
                  >
                    {field}
                  </Button>
                ))
              ) : (
                <p style={{ color: "white" }}>
                  Select a sport to see available fields
                </p>
              )}
            </div>
          </Col>

          {/* Days */}
          <Col className="wid-colum">
            <h2 style={{ color: "white" }}>Days</h2>
            <div className="grid-layout">
              {days.map((day) => (
                <Button
                  key={day}
                  variant={selectedDay === day ? "primary" : "secondary"}
                  onClick={() => setSelectedDay(day)}
                  className="grid-button"
                >
                  {day}
                </Button>
              ))}
            </div>
          </Col>

          {/* Time Slots */}
          <Col className="wid-colum">
            <h2 style={{ color: "white" }}>Time Slots</h2>
            <div className="time-slots-grid">
              {allTimeSlots.map((time) => {
                const isUnavailable = !timesForSelection.includes(time);
                const isSelected = selectedTime === time;

                let buttonClass = `time-slot-button ${
                  isSelected
                    ? "time-slot-selected"
                    : isUnavailable
                    ? "time-slot-unavailable"
                    : "time-slot-available"
                }`;

                return (
                  <Button
                    key={time}
                    className={buttonClass}
                    onClick={() => !isUnavailable && setSelectedTime(time)}
                    disabled={isUnavailable}
                  >
                    {time}
                  </Button>
                );
              })}
            </div>
          </Col>
        </Row>

        {/* Error Message */}
        {errorMessage && (
          <div style={{ color: "red", marginTop: "10px" }}>{errorMessage}</div>
        )}

        <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
          <Button variant="primary" onClick={handleReserveClick}>
            Reserve
          </Button>
          <Button
            variant="secondary"
            // className="back-btn"
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
