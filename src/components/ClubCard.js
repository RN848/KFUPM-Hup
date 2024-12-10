import React from "react";
import { Button, Image } from "react-bootstrap";
import {followClub, unfollowClub} from "../api/apiUserService";
import clubs from "../pages/Clubs";

export default function ClubCard({ club, index, clubStatuses, setClubStatuses }) {
    const handleFollowClick = async (index, club) => {
        const currentStatus = clubStatuses[index];
        const updatedStatuses = [...clubStatuses];
        // Optimistically update the UI
        updatedStatuses[index] = currentStatus === "follow" ? "following" : "follow";
        setClubStatuses(updatedStatuses);

        try {
            if (currentStatus === "follow") {
                await followClub(club._id);
            } else {
                await unfollowClub(club._id);
            }
        } catch (e) {
            console.error("Error updating club status:", e);
            // Revert the status if API call fails
            updatedStatuses[index] = currentStatus;
            setClubStatuses(updatedStatuses);
        }
    };
    return (
        <a href={"/club-profile"} key={index}>
            <div className="club-item">
                <Image
                    src={club.clubPicture || "/images/clubs/computer_club.png"}
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
                            handleFollowClick(index,club);
                        }}
                    >
                        {clubStatuses[index] === "follow" ? "Follow" : "Following"}
                    </Button>
                </div>
            </div>
        </a>
    );
}
