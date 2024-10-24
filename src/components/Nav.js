import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

export default function Nav() {
  const linksList = [
    { key: 0, name: "Home", icon: faHouse, link: "/" },
    { key: 1, name: "Contact", icon: faHouse, link: "/contact" },
    { key: 2, name: "Home", icon: faHouse, link: "/" },
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
