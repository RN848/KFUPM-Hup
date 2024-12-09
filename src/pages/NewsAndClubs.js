import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Body from "../components/Body";
import "../styles/main.css";
import "../styles/master.css";
import "../styles/pages/_latestNews.scss";
import "../styles/pages/_newsAndClubs.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Image, Button } from "react-bootstrap";
import { getAllClubs } from "../api/apiClubService"; // Import the API service for clubs
import { getAllEvents } from "../api/apiEventService"; // Import the API service for events
import { getFollowedClubs, getJoinedEvents } from "../api/apiUserService";
import EventCard from "../components/EventCard";
import ClubCard from "../components/ClubCard"; // Import API services for followed clubs and joined events

const NewsAndClubs = () => {
  const navigate = useNavigate();

  // State to hold fetched clubs and events data
  const [clubList, setClubList] = useState([]);
  const [newsList, setNewsList] = useState([]);
  const [clickedNews, setClickedNews] = useState([]); // Track clicked news
  const [filter, setFilter] = useState(""); // Filter for news
  const [clubStatuses, setClubStatuses] = useState([]); // Track club follow status

  // Example data: These should ideally come from the user's profile
  const [followClubs, setFollowClubs] = useState([]); // User's following clubs
  const [enrolledClubs, setEnrolledClubs] = useState([]); // User's enrolled clubs

  // Fetch clubs and events data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const clubs = await getAllClubs(); // Fetch clubs using the service
        const events = await getAllEvents(); // Fetch events using the service
        const followedClubs = await getFollowedClubs();  // Fetch followed clubs
        const joinedEvents = await getJoinedEvents();   // Fetch joined events

        setClubList(clubs); // Set fetched clubs data
        setNewsList(events); // Set fetched events data
        setFollowClubs(followedClubs);  // Set followed clubs
        setEnrolledClubs(joinedEvents); // Set enrolled events
        setClubStatuses(clubs.map(() => "follow")); // Initialize statuses to "follow"
      } catch (error) {
        console.error("Error fetching clubs and events:", error);
      }
    };

    fetchData();
  }, []);

  // Handle Join/Unjoin News
  const handleJoinClick = (index) => {
    if (!clickedNews.includes(index)) {
      setClickedNews([...clickedNews, index]);
    } else {
      setClickedNews(clickedNews.filter((i) => i !== index)); // Toggle join status
    }
  };

  // Handle Follow/Unfollow Clubs
  const handleFollowClick = (index) => {
    const updatedStatuses = [...clubStatuses];
    updatedStatuses[index] =
        updatedStatuses[index] === "follow" ? "following" : "follow";
    setClubStatuses(updatedStatuses);
  };
  console.log(followClubs);
  console.log(enrolledClubs);

  // Filter News Based on Selection
  const filteredNews = newsList.filter((news) => {
    if (filter === "following") return followClubs.data.includes(news.club);
    if (filter === "enrolled") return enrolledClubs.data.includes(news.club);
    return true; // Default: Show all
  });

  return (
      <Body>
        <div className="news-and-clubs-page">
          <Row>
            {/* News Section */}
            <Col lg={9} md={12}>
              <div className="news-box">
                <div className="news-header d-flex justify-content-between align-items-center">
                  <h1 className="page-title">Latest News and Activities</h1>
                  <div className="news-filter">
                    <Button
                        className={`filter-btn ${filter === "following" ? "active" : ""}`}
                        onClick={() =>
                            setFilter(filter === "following" ? "" : "following")
                        }
                    >
                      Following
                    </Button>
                    <Button
                        className={`filter-btn ${filter === "enrolled" ? "active" : ""}`}
                        onClick={() =>
                            setFilter(filter === "enrolled" ? "" : "enrolled")
                        }
                    >
                      Enrolled
                    </Button>
                  </div>
                </div>
                <Row className="g-4">
                  {filteredNews.map((news, index) => (
                      <EventCard
                          key={index}
                          news={news}
                          index={index}
                          clickedNews={clickedNews}
                      />
                  ))}


                </Row>
                <div className="view-all d-flex justify-content-center mt-4">
                  <Button id="allNews" onClick={() => navigate("/latest-news")}>
                    All
                  </Button>
                </div>
              </div>
            </Col>

            {/* Clubs Section */}
            <Col lg={3} md={12}>
              <div className="clubs-box">
                <h1 className="page-title">Clubs</h1>
                <div className="clubs-list">
                      {clubList.map((club, index) => (
                            <ClubCard
                                key={index}
                                club={club}
                                index={index}
                                clubStatuses={clubStatuses}
                                handleFollowClick={handleFollowClick} // Pass follow functionality
                            />
                        ))}
                </div>
                <div className="view-all d-flex justify-content-center mt-4">
                  <Button onClick={() => navigate("/clubs")}>All</Button>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Body>
  );
};

export default NewsAndClubs;
