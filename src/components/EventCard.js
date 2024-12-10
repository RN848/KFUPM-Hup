// EventCard.js
import React, {useState} from "react";
import { Button, Image } from "react-bootstrap";
import PropTypes from "prop-types";
import { joinEvent, leaveEvent } from "../api/apiUserService";
import Col from "react-bootstrap/Col";

export default function EventCard({ news, isEnrolled, handleJoinEvent }) {
    // Fallback image if news.img is undefined
    const eventImage = news.img || "/images/activities/activity-01.png";

    const handleClick = async () => {
        await handleJoinEvent(news._id);
    };
    return (
        <Col lg={6} md={6} sm={12} xs={12}>
            <div className="news-card">
                <Image
                    src={eventImage}
                    className="news-img"
                    alt={news.title || "Activity Image"}
                    fluid
                />
                <div className="news-details">
                    <h3 className="news-title">{news.title}</h3>
                    <p className="news-desc">{news.description}</p>
                    <Button
                        className={`join-btn ${isEnrolled ? "joined" : ""}`}
                        onClick={handleClick}
                    >
                        {isEnrolled ? "Joined" : "Join"}
                    </Button>
                    )
                </div>
            </div>
        </Col>
    );
}

EventCard.propTypes = {
    news: PropTypes.object.isRequired,
    isEnrolled: PropTypes.bool.isRequired,
    handleJoinEvent: PropTypes.func.isRequired,
};
