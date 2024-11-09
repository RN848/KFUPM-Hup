import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

export default function Nav() {
  const linksList = [
    { key: 0, name: "Home", icon: faHouse, link: "/" },
    { key: 1, name: "frame13", icon: faHouse, link: "/Create-Activity-news" },
    { key: 2, name: "frame14", icon: faHouse, link: "/Manage-Profile" },
    { key: 3, name: "frame20", icon: faHouse, link: "/Your-Profile" },
    { key: 4, name: "frame18", icon: faHouse, link: "/Log-In" },
    { key: 5, name: "frame19", icon: faHouse, link: "/Sign-Up" },
    { key: 6, name: "frame22", icon: faHouse, link: "/New-Clup" },
    { key: 7, name: "frame2", icon: faHouse, link: "/Sports-reservation" },
    { key: 8, name: "frame8", icon: faHouse, link: "/Latest-News" },
    { key: 9, name: "frame15", icon: faHouse, link: "/edit-Activity" },
    { key: 10, name: "frame3", icon: faHouse, link: "/new-reservation" },
    { key: 11, name: "frame4", icon: faHouse, link: "/reservaion-success" },
    { key: 12, name: "frame7", icon: faHouse, link: "/latest-newsAndActivity" },
    { key: 13, name: "frame9", icon: faHouse, link: "/activity-view" },
    { key: 14, name: "frame5&6", icon: faHouse, link: "/reservation-details" },
    { key: 15, name: "frame16", icon: faHouse, link: "/club-members" },
    { key: 16, name: "frame17", icon: faHouse, link: "/members-profile" },
    { key: 17, name: "frame21&10", icon: faHouse, link: "/clubs" },
    { key: 18, name: "frame21", icon: faHouse, link: "/clubs" },
    { key: 19, name: "frame23", icon: faHouse, link: "/edit-club" },
    { key: 20, name: "frame24", icon: faHouse, link: "/error" },
    { key: 21, name: "frame11", icon: faHouse, link: "/club-profile" },
    { key: 22, name: "frame25", icon: faHouse, link: "/loading" },
  ];

  const linkMap = linksList.map((nav) => {
    return (
      <a key={nav.key} href={nav.link} className="link">
        <FontAwesomeIcon icon={nav.icon} size="1x" />
        <a>{nav.name}</a>
      </a>
    );
  });

  return <div className="navLinks">{linkMap}</div>;
}
