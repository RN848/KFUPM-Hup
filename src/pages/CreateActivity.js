// src/pages/CreateActivity.js
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form"; // Ensure Form is imported
import Alert from "react-bootstrap/Alert"; // Import Alert for feedback
import { NormInput, Textarea, Link } from "../components/Inputs"; // Adjust imports as necessary
import { createEvent, updateEvent, getEventById } from "../api/apiEventService"; // Import API functions
import Body from "../components/Body";
import "../styles/main.css";
import "../styles/master.css";

const CreateActivity = () => {
  const [inputs, setInputs] = useState({
    title: "",
    subTitle: "",
    description: "",
    location: "",
    joinLink: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const [eventId, setEventId] = useState(null); // To store the event ID when editing
  const [loading, setLoading] = useState(false); // For form submission
  const [error, setError] = useState(null); // For error messages
  const [success, setSuccess] = useState(null); // For success messages

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fromEdit = localStorage.getItem("fromEdit");
    if (fromEdit && location.state && location.state.eventId) {
      setIsEdit(true);
      setEventId(location.state.eventId);
      // Fetch the event details to prepopulate the form
      const getEventDetails = async () => {
        try {
          const event = await getEventById(location.state.eventId);
          setInputs({
            title: event.title || "",
            subTitle: event.subTitle || "",
            description: event.description || "",
            location: event.location || "",
            joinLink: event.joinLink || "",
          });
        } catch (err) {
          console.error("Error fetching event details:", err);
          setError("Failed to fetch event details. Please try again.");
        }
      };
      getEventDetails();
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true);
    setError(null);
    setSuccess(null);

    // Basic validation
    if (
        !inputs.title.trim() ||
        !inputs.subTitle.trim() ||
        !inputs.description.trim()
    ) {
      setError("Please fill in all the required fields.");
      setLoading(false);
      return;
    }

    // Prepare the data to send
    const eventData = {
      title: inputs.title,
      subTitle: inputs.subTitle,
      description: inputs.description,
      location: inputs.location,
      joinLink: inputs.joinLink,
    };

    try {
      let response;
      if (isEdit && eventId) {
        // Update the existing event
        response = await updateEvent(eventId, eventData);
        setSuccess("Event updated successfully!");
      } else {
        // Create a new event
        response = await createEvent(eventData);
        setSuccess("Event created successfully!");
        // Optionally, reset the form
        setInputs({
          title: "",
          subTitle: "",
          description: "",
          location: "",
          joinLink: "",
        });
      }
    } catch (err) {
      console.error("Error submitting the form:", err);
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
      // Optionally, navigate to another page after a delay
      // setTimeout(() => {
      //   navigate("/clubleaderHomePage");
      // }, 2000);
    }
  };

  return (
      <Body>
        <div className="body">
          <h1>{isEdit ? "Edit Activity / News" : "Create Activity / News"}</h1>
          <Form className="form" onSubmit={handleSubmit}>
            <Row className="g-4 wid-row" md={2} sm={1} xs={1}>
              <Col>
                <div className="wid-colum">
                  <NormInput
                      inputs={inputs}
                      setInputs={setInputs}
                      input={"title"}
                      type={"text"}
                      label={"Title"}
                      placeholder={"A short, descriptive name for the activity"}
                      required={true}
                  />

                  <NormInput
                      inputs={inputs}
                      setInputs={setInputs}
                      input={"subTitle"}
                      type={"text"}
                      label={"Subtitle"}
                      placeholder={"Your Subtitle Here"}
                      required={true}
                  />

                  <Textarea
                      inputs={inputs}
                      setInputs={setInputs}
                      input={"description"}
                      label={"Description"}
                      placeholder={"A detailed explanation of the activity/news"}
                      required={true}
                  />

                  <NormInput
                      inputs={inputs}
                      setInputs={setInputs}
                      input={"location"}
                      type={"text"}
                      label={"Location (Optional)"}
                      placeholder={"Event location"}
                      required={false}
                  />
                </div>
              </Col>
              <Col>
                <div className="wid-colum">
                  <Link
                      inputs={inputs}
                      setInputs={setInputs}
                      input={"joinLink"}
                      type={"text"}
                      label={"Join Link (Optional)"}
                      placeholder={"https://join.link"}
                  />
                </div>

                {/* Display Success or Error Messages */}
                {success && <Alert variant="success">{success}</Alert>}
                {error && <Alert variant="danger">{error}</Alert>}

                <div className="form">
                  <div
                      style={{
                        display: "flex",
                        justifyContent: "end",
                        gap: "20px",
                        marginTop: "50px",
                      }}
                  >
                    <Button
                        className={"inputs-btn back"}
                        type="button" // Changed from type="submit" to type="button"
                        onClick={() => {
                          navigate("/clubleaderHomePage");
                        }}
                    >
                      Cancel
                    </Button>
                    <Button
                        className="inputs-btn"
                        type="submit" // Kept as type="submit"
                        disabled={loading}
                    >
                      {loading
                          ? "Submitting..."
                          : isEdit
                              ? "Update"
                              : "Submit"}
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          </Form>
        </div>
      </Body>
  );
};

export default CreateActivity;
