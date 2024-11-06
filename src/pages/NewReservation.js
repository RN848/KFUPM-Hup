import Body from "../components/Body";
import "../styles/main.css";
import "../styles/master.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Image, Button, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

import Basketball from "../images/sports/sport-1.jpg";
import Football from "../images/sports/sport-2.jpg";
import tennis from "../images/sports/sport-3.jpg";
import Volleyball from "../images/sports/sport-4.jpg";
import Squash from "../images/sports/sport-5.jpg";
import Badminton from "../images/sports/sport-6.jpg";

const NewReservation = () => {
  const [sport, setsport] = useState({ filter: "" });
  const [reservationType, setReservationType] = useState("Public");
  const [selectedField, setSelectedField] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const sportsList = [
    { name: "Basketball", image: Basketball },
    { name: "Football", image: Football },
    { name: "tennis", image: tennis },
    { name: "Volleyball", image: Volleyball },
    { name: "Squash", image: Squash },
    { name: "Badminton", image: Badminton },
  ];

  const sportsMap = sportsList.map((s) => {
    const isActive = sport.filter === s.name;

    return (
      <div key={s.name} className={isActive ? "focus" : ""}>
        <a
          href=""
          onClick={(e) => {
            e.preventDefault();
            setsport({ filter: s.name });
          }}
        >
          <Image className="img" src={s.image} alt={s.name}></Image>
        </a>
        <span>{s.name}</span>
      </div>
    );
  });

  const fields = ["Feild 1", "Feild 2", "Feild 3", "Feild 4", "Feild 5", "Feild 6", "Feild 7", "Feild 8"];
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const timeSlots = [
    "00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00",
    "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"
  ];

  return (
    <Body>
      <div className="body">
        <h1>New Reservation</h1>
        <Row className={"g-4 wid-row reverse"} style={{ marginBottom: "1.5em" }}>
          <Col lg={8} md={8} sm={12}>
            <div className={"wid-colum sports"}>{sportsMap}</div>
          </Col>
          <Col>
             <div className="wid-colum form"
                    style={{
                     display: "flex",
                      justifyContent: "center",
                      alignItems: "end",
                              }} >


                    <h4 style={{ color: "white", margin:" 0 0 50px 0px", fontSize: "2rem" }}>Type</h4>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start"}}>
                    <ToggleButtonGroup
                        type="radio"
                        name="type"
                        vertical
                        value={reservationType}
                        onChange={setReservationType}
                    >
                        <ToggleButton
                        variant="outline-primary"
                        value="Public"
                        style={{
                            textAlign: "center",
                            width: "100%",
                            padding: "10px 50px",
                            marginBottom: "20px",
                            fontSize: "1.25rem",   
                        }}
                        >Public</ToggleButton>
                        <ToggleButton
                        variant="outline-primary"
                        value="Private"
                        style={{
                            textAlign: "center",
                            width: "100%",
                            padding: "10px 50px", 
                            fontSize: "1.25rem",  
                        }}
                        >Private</ToggleButton>
                    </ToggleButtonGroup>
                    </div>
                </div>
                </Col>
        </Row>

        
       
        <Row className="selection-options">
          <Col className="fields-selection">
            <h5>Fields</h5>
            <div className="fields-grid">
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

          <Col className="days-selection">
            <h5>Day</h5>
            <div className="days-grid">
              {days.map((day) => (
                <Button
                  key={day}
                  variant={selectedDay === day ? "primary" : "secondary"}
                  onClick={() => setSelectedDay(day)}
                >
                  {day}
                </Button>
              ))}
            </div>
          </Col>

          <Col className="time-selection">
            <h5>Time Slots</h5>
            <div className="time-slots-grid">
              {timeSlots.map((time) => (
                <Button
                  key={time}
                  variant={selectedTime === time ? "primary" : "secondary"}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </Button>
              ))}
            </div>
          </Col>
        </Row>

        <div className="action-buttons">
          <Button variant="primary" onClick={() => alert("Reservation made!")}>Reserve</Button>
          <Button variant="secondary" onClick={() => alert("Reservation canceled")}>Cancel</Button>
        </div>
      </div>
    </Body>
  );
};

export default NewReservation;
