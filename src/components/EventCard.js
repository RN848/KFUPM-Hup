import React from "react";
import { Button, Image } from "react-bootstrap";
import Col from "react-bootstrap/Col";

export default function EventCard({ news, index, clickedNews, handleJoinClick }) {
    return (
        <Col key={index} lg={6} md={6} sm={12} xs={12}>
            <a href={"/activity-view"}>
                <div className="news-card">
                    <Image
                        src={news.img}
                        className="news-img"
                        alt={news.title}
                    />
                    <div className="news-details">
                        <h3 className="news-title">{news.title}</h3>
                        <p className="news-desc">{news.desc}</p>
                        <Button
                            className={`join-btn ${clickedNews.includes(index) ? "joined" : ""}`}
                            onClick={(e) => {
                                e.preventDefault(); // Prevent link navigation
                                e.stopPropagation();
                                handleJoinClick(index); // Handle join click
                            }}
                        >
                            {clickedNews.includes(index) ? "Joined" : "Join"}
                        </Button>
                        {clickedNews.includes(index) && (
                            <p className="joined-message">
                                You have successfully joined this activity!
                            </p>
                        )}
                    </div>
                </div>
            </a>
        </Col>
    );
}
