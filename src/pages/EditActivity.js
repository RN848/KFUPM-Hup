import Body from "../components/Body";
import "../styles/main.css";
import "../styles/master.css";
import "../styles/pages/_latestNews.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Image } from "react-bootstrap";
import defaultImg from "../public/images/activities/activity-01.png"
import Button from "react-bootstrap/Button";
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {fetchClubActivities} from "../api/apiClubService";

const EditActivity = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const { clubId  } = location.state || {};
  const [newsList, setNewsList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const clubActivities = await fetchClubActivities(clubId);
      console.log(clubActivities);
      setNewsList(clubActivities)

    };

    fetchData()
  }, []);
  const handleEditClick = (title) => {
    alert(`Editing activity: ${title}`);
  };

  return (
    <Body>
      <div className="news-page">
        <h1 className="page-title" style={{ marginBottom: "30px" }}>
          Edit News and Activities
        </h1>
        <Row className="news-container">
          {newsList.map((news, index) => (
            <Col key={index} lg={6} md={6} sm={12} xs={12} className="news-col">
              <div className="news-card">
                <Image className="news-img" src={news.img || defaultImg} alt={news.title} />
                <div
                  className="news-details"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <h3 className="news-title">{news.title}</h3>
                  <p className="news-desc">{news.description}</p>
                  <Button
                    className="news-join-btn"
                    style={{
                      width: "100%",
                      maxWidth: "150px",
                      padding: "0.5rem 1rem",
                    }}
                    onClick={() => {
                      navigate("/Create-activity-news",{state : {fromEdit:true,clubId:clubId}});
                    }
                  }

                  >
                    Edit
                  </Button>
                </div>
              </div>
            </Col>
          ))}
        </Row>
        {/* Back Button */}
        <Button className="back-btn" onClick={() => window.history.back()}>
          Back
        </Button>
      </div>
    </Body>
  );
};

export default EditActivity;
