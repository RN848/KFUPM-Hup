import Body from "../components/Body";
import "../styles/main.css";
import "../styles/master.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Image } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { NormInput } from "../components/Inputs";

import Basketball from "../images/sports/sport-1.jpg";
import Football from "../images/sports/sport-2.jpg";
import Tennis from "../images/sports/sport-3.jpg";
import Volleyball from "../images/sports/sport-4.jpg";
import Squash from "../images/sports/sport-5.jpg";
import Badminton from "../images/sports/sport-6.jpg";

const SportsReserve = () => {
  const [sport, setSport] = useState({ filter: "" });
  const [backendReservations, setBackendReservations] = useState([]);
  const [inputs, setInputs] = useState({ code: "" });
  const navigate = useNavigate();

  const sportsList = [
    { name: "Basketball", image: Basketball },
    { name: "Football", image: Football },
    { name: "Tennis", image: Tennis },
    { name: "Volleyball", image: Volleyball },
    { name: "Squash", image: Squash },
    { name: "Badminton", image: Badminton },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/reservationRoute"
        );
        setBackendReservations(response.data);
      } catch (error) {
        console.error("Error fetching from backend:", error);
      }
    };
    fetchData();
  }, []);

  const sportsMap = sportsList.map((s) => {
    const isActive = sport.filter === s.name;
    return (
      <div className={isActive ? "focus" : ""} key={s.name}>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setSport({ filter: s.name });
          }}
        >
          <Image className="img" src={s.image} alt={s.name}></Image>
        </a>
        <span>{s.name}</span>
      </div>
    );
  });

  const filteredReservations = backendReservations.filter(
    (box) => sport.filter === "" || box.sport === sport.filter
  );

  const reservationMap = filteredReservations.map((box, index) => {
    let displayDay = box.day;
    let displayDate = "";

    if (box.date) {
      const reservationDate = new Date(box.date);
      const weekday = reservationDate.toLocaleDateString("en-US", {
        weekday: "long",
      });
      const fullDate = reservationDate.toLocaleDateString("en-US");
      displayDay = `${weekday}, ${fullDate}`;
    }

    return (
      <Col
        lg={4}
        md={4}
        sm={6}
        xs={12}
        className="sport-col"
        key={box._id || index}
      >
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigate("/reservation-details", {
              state: {
                isOwnerView: false,
                reservation: { ...box, day: displayDay },
              },
            });
          }}
        >
          <div>
            <h3>{box.sport}</h3>
            <div className="details">
              <span>{box.field}</span>
              <span>{displayDay}</span>
              <span>{box.time}</span>
            </div>
          </div>
        </a>
      </Col>
    );
  });

  return (
    <Body>
      <div className="body">
        <h1>Sport Reservation</h1>
        <Row
          className={"g-4 wid-row reverse"}
          style={{ marginBottom: "1.5em" }}
        >
          <Col lg={8} md={8} sm={12}>
            <div className={"wid-colum sports"}>{sportsMap}</div>
          </Col>
          <Col>
            <div className="wid-colum">
              <div
                className="form"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "end",
                }}
              >
                <div
                  style={{
                    margin: "0 10px 15px 0",
                    display: "flex",
                    gap: "10px",
                  }}
                >
                  <Col
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "15px",
                    }}
                  >
                    <Button
                      className="inputs-btn"
                      as="input"
                      type="button"
                      value="My Reservation"
                      onClick={() =>
                        navigate("/reservation-details", {
                          state: {
                            isOwnerView: true,
                            reservation: backendReservations[0] || null,
                          },
                        })
                      }
                    />
                    <Button
                      className="inputs-btn"
                      as="input"
                      type="button"
                      value="New Reservation"
                      onClick={() => navigate("/new-reservation")}
                    />
                  </Col>
                </div>

                <div style={{ padding: "0 0 15px 15px" }}>
                  <NormInput
                    inputs={inputs}
                    setInputs={setInputs}
                    input={"number"}
                    type={"code"}
                    label={"Code"}
                    placeholder={"2335"}
                  />
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row className={"g-4 wid-row sports-box"}>{reservationMap}</Row>
      </div>
    </Body>
  );
};

export default SportsReserve;
