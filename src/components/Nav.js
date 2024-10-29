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
