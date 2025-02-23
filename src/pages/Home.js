import Body from "../components/Body";
import "../styles/main.css";
import "../styles/master.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Image } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import "../styles/pages/_home.scss";
import { NormInput } from "../components/Inputs";
import { Textarea } from "../components/Inputs";
import { Radio } from "../components/Inputs";
import { Uplode } from "../components/Inputs";
import { Link } from "../components/Inputs";

import reserve from "../images/home/reserve.jpg";
import clups from "../images/home/clups.jpg";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import GlassyCard from "./GlassyCard";

const Home = () => {
  const [inputs, setInputs] = useState({
    title: "",
    subtitle: "",
    desc: "",
    type: "activity",
    appearance: "all",
    joinLink: "dfdffdf",
    image: "No file chosen",
  });

  const navigate = useNavigate();

  return (
    <Body>
      <div className="home-page">
        <a href={"/Sports-reservation"}>
      <GlassyCard title="Sports Reservation" />
        </a>
        <a href={"/news-clubs"}>
      <GlassyCard title="Student Clubs" />
        </a>
    </div>
    </Body>
  );
};

export default Home;
