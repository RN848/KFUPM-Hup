import Body from "../components/Body";
import "../styles/main.css";
import "../styles/master.css";
import "../styles/pages/_ClLeadHomePage.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Image } from "react-bootstrap";

const ClLeadHomePage = () => {
    const clubMembers = ["Rayan Almalki", "Rayan Almalki", "Rayan Almalki"];
    const clubActivity = [
        {
            AcName: "News Activity 1",
            AcDescription: "news activity news activ",
            AcImg: "../images/activities/activity-02.jpg",
        },
        {
            AcName: "News Activity 2",
            AcDescription: "news activity news activ",
            AcImg: "../images/activities/activity-02.jpg",
        },
        {
            AcName: "News Activity 3",
            AcDescription: "news activity news activ",
            AcImg: "../images/activities/activity-02.jpg",
        },
        {
            AcName: "News Activity 4",
            AcDescription: "news activity news activ",
            AcImg: "../images/activities/activity-02.jpg",
        },
    ];

    return (
        <Body>
            <div className="body">
                <Row className="ClLeadHomePage">
                    {/* Club News and Activity Section */}
                    <Col xl={7} lg={8} md={12} className="news-box">
                        <h1>Club News and Activity</h1>
                        <Row className="activity-container">
                            {clubActivity.map((activity, index) => (
                                <Col
                                    xs={12}
                                    md={6}
                                    className="activity-item"
                                    key={`activity-${index}`}
                                >
                                    <Image
                                        src={activity.AcImg}
                                        className="activity-img"
                                        alt="Activity"
                                    />
                                    <div className="activity-info">
                                        <h3>{activity.AcName}</h3>
                                        <p>{activity.AcDescription}</p>
                                    </div>
                                    <Button variant="dark" className="edit-btn">
                                        Edit
                                    </Button>
                                </Col>
                            ))}
                        </Row>
                        <div className="activity-buttons">
                            <Button variant="primary" className="all-btn">
                                All
                            </Button>
                            <Button variant="primary" className="add-btn">
                                Add new
                            </Button>
                        </div>
                    </Col>

                    {/* Members Section */}
                    <Col xl={4} lg={4} md={12} className="members-box">
                        <h1>Members</h1>
                        <div className="member-container">
                            {clubMembers.map((member, index) => (
                                <Row className="member-item" key={`member-${index}`}>
                                    <Col xs={3}>
                                        <Image
                                            src="../images/activities/activity-02.jpg"
                                            className="member-img"
                                            alt="Member"
                                        />
                                    </Col>
                                    <Col xs={9} className="member-info">
                                        <h4>{member}</h4>
                                        <Button variant="primary" className="profile-btn">
                                            Profile
                                        </Button>
                                        <Button variant="danger" className="remove-btn">
                                            Remove
                                        </Button>
                                    </Col>
                                </Row>
                            ))}
                        </div>
                        <div className="member-buttons">
                            <Button variant="primary" className="all-btn">
                                All
                            </Button>
                            <Button variant="primary" className="add-btn">
                                Add
                            </Button>
                        </div>
                    </Col>
                </Row>

                {/* Manage Profile Section */}
                <div className="manage-profile">
                    <Button variant="light" className="manage-profile-btn">
                        Manage Club Profile
                    </Button>
                </div>
            </div>
        </Body>
    );
};

export default ClLeadHomePage;
