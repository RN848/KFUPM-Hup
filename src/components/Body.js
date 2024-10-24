import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "./Nav.js";

export default function Body(props) {
  return (
    <>
      <Container fluid style={{ height: "100%" }}>
        {/*  */}

        <Row style={{ height: "100%" }}>
          {/*  */}

          <Col xs="2" className="sidNav" style={{ padding: "0" }}>
            <Nav />
          </Col>

          <Col className="cont">
            <Container style={{ paddingTop: "20px" }}>
              {props.children}
            </Container>
          </Col>

          {/*  */}
        </Row>
      </Container>
    </>
  );
}
