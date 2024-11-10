import Body from "../components/Body";
import "../styles/main.css";
import "../styles/master.css";
import "../styles/pages/_ClubProfile.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";

const ClubProfile = () => {
    const navigate = useNavigate();

    const clubdata = [
        {
            name: "Computer Club",
            logo: "../images/activities/activity-01.jpg",
            desc: "Computer Club description goes here.",
        },
    ];

    const clubActivity = [
        {
            AcName: "Activity 1",
            AcDescription: "Description for Activity 1 goes here.",
            AcImg: "../images/activities/activity-02.jpg",
        },
        {
            AcName: "Activity 2",
            AcDescription: "Description for Activity 2 goes here.",
            AcImg: "../images/activities/activity-02.jpg",
        },
    ];

    return (
        <Body>
            <div className="body">
                <Container>
                    {/* Club Header */}
                    <Row className="news-box p-4 ClubProfile">
                        <Col xs={12} md={4}>
                            <Image
                                src={clubdata[0].logo}
                                className="Img"
                                alt={`${clubdata[0].name} logo`}
                            />
                        </Col>
                        <Col xs={12} md={8}>
                            <h1>{clubdata[0].name}</h1>
                            <Button>Following</Button>
                            <p>{clubdata[0].desc}</p>
                            <Row>
                                <Col xs={6}>
                                    <h5>Email:</h5>
                                    <p>email.com</p>
                                </Col>
                                <Col xs={6}>
                                    <h5>Phone:</h5>
                                    <p>0500000001</p>
                                </Col>
                                <Col xs={6}>
                                    <h5>X:</h5>
                                    <p>@Computer Club</p>
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    {/* Activities Section */}
                    <Row>
                        <Col>
                            <header>
                                <h1>Latest News And Activities</h1>
                                <Button variant={"secondary"} onClick={() => navigate(-1)}>
                                    Back
                                </Button>
                            </header>
                        </Col>
                    </Row>
                    <Row>
                        {clubActivity.map((activity, index) => (
                            <Row className="activity-item mb-4" key={index}>
                                <Col xs={12} md={4}>
                                    <Image
                                        src={activity.AcImg}
                                        className="club-logo"
                                        alt={`${activity.AcName}`}
                                    />
                                </Col>
                                <Col xs={12} md={8}>
                                    <h2>{activity.AcName}</h2>
                                    <p>{activity.AcDescription}</p>
                                    <Button variant={"dark"}>Join</Button>
                                </Col>
                            </Row>
                        ))}
                    </Row>
                </Container>
            </div>
        </Body>
    );
};

export default ClubProfile;
