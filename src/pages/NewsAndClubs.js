// NewsAndClubs.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Body from "../components/Body";
import "../styles/main.css";
import "../styles/master.css";
import "../styles/pages/_latestNews.scss";
import "../styles/pages/_newsAndClubs.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";
import { getAllClubs } from "../api/apiClubService"; // Import the API service for clubs
import { getAllEvents } from "../api/apiEventService"; // Import the API service for events
import {
  getFollowedClubs,
  getJoinedEvents,
  followClub,
  unfollowClub,
  leaveEvent,
  joinEvent
} from "../api/apiUserService";
import EventCard from "../components/EventCard";
import ClubCard from "../components/ClubCard"; // Import API services for followed clubs and joined events

const NewsAndClubs = () => {
  const navigate = useNavigate();

  // State to hold fetched clubs and events data
  const [clubList, setClubList] = useState([]);
  const [newsList, setNewsList] = useState([]);
  const [enrolledEventIds, setEnrolledEventIds] = useState([]); // Track enrolled events by their IDs
  const [filter, setFilter] = useState(""); // Filter for news
  const [clubStatuses, setClubStatuses] = useState([]); // Track club follow status

  // Example data: These should ideally come from the user's profile
  const [followClubs, setFollowClubs] = useState([]); // User's following clubs

  // Fetch clubs and events data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const AllClubs = await getAllClubs(); // Fetch clubs using the service
        const clubs = AllClubs.slice(0, 4); // Limit to the first 8
        const AllEvents = await getAllEvents(); // Fetch events using the service
        const events = AllEvents.slice(0, 4); // Limit to the first 8

        const followedClubsResponse = await getFollowedClubs(); // Fetch followed clubs
        const joinedEventsResponse = await getJoinedEvents(); // Fetch joined events

        setClubList(clubs); // Set fetched clubs data
        setNewsList(events); // Set fetched events data
        setFollowClubs(followedClubsResponse.data); // Assuming response has a 'data' property
        setEnrolledEventIds(joinedEventsResponse.data.map(event => event._id)); // Set enrolled event IDs

        // Create a set for faster lookup of followed club IDs
        const followedClubIds = new Set(followedClubsResponse.data.map(club => club._id)); // Assuming each club has a unique '_id'

        // Set status based on whether the club is followed
        const statuses = clubs.map(club => (followedClubIds.has(club._id) ? "following" : "follow"));
        setClubStatuses(statuses);
      } catch (error) {
        console.error("Error fetching clubs and events:", error);
      }
    };

    fetchData();
  }, []);

  // Handler to join or leave an event
  const handleJoinEvent = async (eventId) => {
    if (enrolledEventIds.includes(eventId)) {
      // User wants to leave the event
      try {
        await leaveEvent(eventId);
        setEnrolledEventIds(enrolledEventIds.filter(id => id !== eventId));
      } catch (error) {
        console.error("Error leaving event:", error);
        // Optionally, display an error message to the user
      }
    } else {
      // User wants to join the event
      try {
        await joinEvent(eventId);
        setEnrolledEventIds([...enrolledEventIds, eventId]);
      } catch (error) {
        console.error("Error joining event:", error);
        // Optionally, display an error message to the user
      }
    }
  };

  // Handler to follow or unfollow a club
  const handleFollowClub = async (index, clubId) => {
    const currentStatus = clubStatuses[index];
    const updatedStatuses = [...clubStatuses];
    // Optimistically update the UI
    updatedStatuses[index] = currentStatus === "follow" ? "following" : "follow";
    setClubStatuses(updatedStatuses);

    try {
      if (currentStatus === "follow") {
        await followClub(clubId);
      } else {
        await unfollowClub(clubId);
      }
    } catch (error) {
      console.error("Error updating club status:", error);
      // Revert the status if API call fails
      updatedStatuses[index] = currentStatus;
      setClubStatuses(updatedStatuses);
    }
  };

  // Filter News Based on Selection
  const filteredNews = newsList.filter((news) => {
    if (filter === "following") {
      // Ensure followClubs and news.createdByClub are defined
      if (!followClubs || !news.createdByClub) return false;
      return followClubs.some(club => {
        console.log(club.name + " OLA " + news.createdByClub.toString())
        console.log(club._id.toString() === news.createdByClub.toString())
        return club._id.toString() === news.createdByClub.toString()
      });
    }
    if (filter === "enrolled") {
      // Show only enrolled events
      return enrolledEventIds.includes(news._id);
    }
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
                  {filteredNews.map((news) => (
                      <EventCard
                          key={news._id} // Use unique event ID
                          news={news}
                          isEnrolled={enrolledEventIds.includes(news._id)}
                          handleJoinEvent={handleJoinEvent}
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
                          key={club._id} // Use unique club ID
                          club={club}
                          index={index}
                          clubStatuses={clubStatuses}
                          setClubStatuses={setClubStatuses}
                          handleFollowClub={handleFollowClub}
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
