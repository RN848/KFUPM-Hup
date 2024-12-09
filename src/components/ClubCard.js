import React from "react";
import { Button, Image } from "react-bootstrap";

export default function ClubCard({ club, index, clubStatuses, handleFollowClick }) {
    return (
        <a href={"/club-profile"} key={index}>
            <div className="club-item">
                <Image
                    src={club.clubPicture || "../images/clubs/default_logo.png"}
                    className="club-logo"
                    alt={club.name}
                />
                <div className="club-details">
                    <h4 className="club-title">{club.name}</h4>
                    <Button
                        className={`club-action-btn ${clubStatuses[index]}`}
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleFollowClick(index);
                        }}
                    >
                        {clubStatuses[index] === "follow" ? "Follow" : "Following"}
                    </Button>
                </div>
            </div>
        </a>
    );
}
