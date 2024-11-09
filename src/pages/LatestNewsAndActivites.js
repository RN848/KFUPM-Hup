import Body from "../components/Body";
import "../styles/main.css";
import "../styles/master.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {Image} from "react-bootstrap";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import Container from "react-bootstrap/Container";
const LatestNewsAndActivites = () => {
    const maxOut = 4;
    const navigate = useNavigate();

   const newsList = [
    {
      title: "news activity news activ",
      desc: "news activity news acactivity tiv",
      img: "../images/activities/activity-01.jpg",
      join: "",
      clup: "1",
    },
    {
      title: "news activity news activ",
      desc: "news activity news acactivity tiv",
      img: "../images/activities/activity-02.jpg",
      join: "",
      clup: "2",
    },
    {
      title: "news activity news activ",
      desc: "news activity news acactivity tiv",
      img: "../images/activities/activity-03.jpg",
      join: "",
      clup: "3",
    },
    {
      title: "news activity news activ",
      desc: "news activity news acactivity tiv",
      img: "../images/activities/activity-04.jpg",
      join: "",
      clup: "1",
    },
    {
      title: "news activity news activ",
      desc: "news activity news acactivity tiv",
      img: "../images/activities/activity-01.jpg",
      join: "",
      clup: "2",
    },
    {
      title: "news activity news activ",
      desc: "news activity news acactivity tiv",
      img: "../images/activities/activity-03.jpg",
      join: "",
      clup: "1",
    },
    {
      title: "news activity news activ",
      desc: "news activity news acactivity tiv",
      img: "../images/activities/activity-02.jpg",
      join: "",
      clup: "1",
    },
  ];

   const clubList = [
       {
           title: "Computer Club",
           logo: "../images/activities/activity-01.jpg",
       },
       {
           title: "First Aid Club",
           logo: "../images/activities/activity-01.jpg",
       },
       {
           title: "Community Club",
           logo: "../images/activities/activity-01.jpg",
       }
    ];

  const [filter, setFilter] = useState("");

  const followClups = ["1", "2"];
  const enrolledClups = ["3"];

  const filteredNews = newsList.filter((news) => {
    if (filter === "following") {
      return followClups.includes(news.clup);
    }
    if (filter === "enrolled") {
      return enrolledClups.includes(news.clup);
    }
    return true; // Show all news if no filter is applied
  });

  let move = 0;
  const newsMap = filteredNews.map((news) => {
      if (move < maxOut) {
          move += 1;
          return (
              <Col lg={6} md={6} sm={12} xs={12} className="news-col">
                  <a href="">
                      <div>
                          <Image className="img" src={news.img}></Image>
                          <div className="deteils">
                              <div className="text">
                                  <h3>{news.title}</h3>
                                  <p>{news.desc}</p>
                              </div>
                              <div className="form">
                                  <Button className="join">join</Button>
                              </div>
                          </div>
                      </div>
                  </a>
              </Col>
          );
      }
  });
    newsMap.filter((news) => {});
    return (
      <Body className={""}>
          <div className="body">
              {/* Main Content Row */}
              <Row>
                  {/* News Column */}
                  <Col xs={9} className="wid-row news-box mx-2">
                      <h1 style={{color: "white"}}>Latest News and Activity</h1>

                      <div>
                          {/* Filter Buttons */}
                          <Button
                              className={`filterb ${filter === "following" ? "active" : ""} m-3`}
                              onClick={() =>
                                  setFilter(filter === "" || filter === "enrolled" ? "following" : "")
                              }
                          >
                              following
                          </Button>
                          <Button
                              className={`filterb ${filter === "enrolled" ? "active" : ""}`}
                              onClick={() =>
                                  setFilter(filter === "" || filter === "following" ? "enrolled" : "")
                              }
                          >
                              enrolled
                          </Button>
                      </div>
                      {newsMap}
                          <div className={"d-flex justify-content-center"}>
                      <Button onClick={() => {
                          navigate("/Latest-News")
                      }}>All</Button>
                          </div>
                  </Col>

                  {/* Clubs Column */}
                  <Col xs={2} className="wid-row news-box mx-2">

                      <h1 style={{color: "white"}}>Clubs</h1>
                      {/* Club List */}
                      {clubList.map((club, index) => (
                          <div key={index} className="club-item mb-3">
                              <Image src={club.logo} className="club-logo mb-2" alt={club.title}/>
                              <h4>{club.title}</h4>
                          </div>
                      ))}
                  </Col>
              </Row>
          </div>
      </Body>

  );
}

export default LatestNewsAndActivites;