import Body from "../components/Body";
import "../styles/main.css";
import "../styles/master.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {Image} from "react-bootstrap";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const ActivityView = () => {
    const clubList = [
        {
            title: "Computer Club",
            logo: "../images/activities/activity-01.jpg",
            desc: "Computer Club",
        },
        {
            title: "First Aid Club",
            logo: "../images/activities/activity-01.jpg",
            desc: "First Aid Club",
        },
        {
            title: "Community Club",
            logo: "../images/activities/activity-01.jpg",
            desc: "Community Club",
        }
    ];

    return (
      <Body>
        <div className={"body"}>
        <Row className={"news-box"}>
            <Row>
                <div  className={"d-flex justify-content-end mt-2"}>
                <Button>Back</Button>
                </div>
            </Row>
            <Row className={"mx-2"}>
                <Col>
                    <Image src={clubList.at(0).logo} title={'logo'} className={"club-img"}></Image>
                    <Col className={"my-2 row"}>
                        <Row>
                            <Col xs={2}>
                            <Image src={clubList.at(0).logo} title={'logo'} className={"club-logo"} style={{display: "inline"}}></Image>
                            </Col>
                            <Col xs={6}>
                                <span className={"text-white-1 fw-bolder h4 mx-2"} style={{color: "white"}}>{clubList.at(0).title}</span>
                                <Button className={"my-2"}>follow</Button>
                            </Col>
                        </Row>
                    </Col>
                </Col>
                <Col>
                    <h1 style={{color: "white"}}>{clubList.at(0).title}</h1> {/* this data and the above will be changed in the backend of things not now */}
                    <h1>{clubList.at(0).desc}</h1>
                    <Button>Join</Button>
                    <div>
                        Data
                    </div>
                </Col>
            </Row>
        </Row>
        </div>
      </Body>
    );

}

export default ActivityView;