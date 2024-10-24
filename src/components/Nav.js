import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

export default function Nav(props) {
  return (
    <div className="navLinks">
      <div className="link">
        <FontAwesomeIcon icon={faHouse} size="1x" />
        <a>Home</a>
      </div>
      <div className="link">
        <FontAwesomeIcon icon={faHouse} size="1x" />
        <a>Home</a>
      </div>
      <div className="link">
        <FontAwesomeIcon icon={faHouse} size="1x" />
        <a>Home</a>
      </div>
    </div>
  );
}
