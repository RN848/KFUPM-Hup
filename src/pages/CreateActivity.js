// src/pages/CreateActivity.js
import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form"; 
import Alert from "react-bootstrap/Alert"; 
import { NormInput, Textarea, Link } from "../components/Inputs";
import { createEvent, updateEvent, getEventById } from "../api/apiEventService";
import Body from "../components/Body";
import "../styles/main.css";
import "../styles/master.css";
// Import UserContext or your authentication context if available
// import { UserContext } from "../context/UserContext"; // Example path

const CreateActivity = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Destructure clubId, fromEdit, and eventId from location.state
    const { clubId, fromEdit, eventId } = location.state || {};

    // If using UserContext to get clubId
    // const { user } = useContext(UserContext);
    // const clubId = user.clubId;

    // State to manage form inputs
    const [inputs, setInputs] = useState({
        title: "",
        subTitle: "",
        description: "",
        location: "",
        joinLink: "",
        date: "", // New field
    });

    // State to determine if the form is in edit mode
    const [isEdit, setIsEdit] = useState(false);

    // States for handling loading, errors, and success messages
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState(null); 
    const [success, setSuccess] = useState(null); 

    useEffect(() => {
        // Check if fromEdit is true and eventId is provided
        if (fromEdit && eventId) {
            setIsEdit(true);

            const fetchEventDetails = async () => {
                setLoading(true);
                try {
                    // Fetch the event details from the backend using the eventId
                    const event = await getEventById(eventId);
                    
                    // Populate the form with the fetched event data
                    setInputs({
                        title: event.title || "",
                        subTitle: event.subTitle || "",
                        description: event.description || "",
                        location: event.location || "",
                        joinLink: event.joinLink || "",
                        date: event.date ? event.date.slice(0,16) : "", // Format for datetime-local
                    });
                } catch (err) {
                    console.error("Error fetching event details:", err);
                    setError(err.response?.data?.message || "Failed to fetch event details. Please try again.");
                } finally {
                    setLoading(false);
                }
            };

            fetchEventDetails();
        }
    }, [fromEdit, eventId]);

    // Handler for form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputs((prevInputs) => ({
            ...prevInputs,
            [name]: value,
        }));
    };

    // Handler for form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        // Basic validation to ensure required fields are filled
        if (
            !inputs.title.trim() ||
            !inputs.subTitle.trim() ||
            !inputs.description.trim() ||
            !inputs.date.trim()
        ) {
            setError("Please fill in all the required fields.");
            setLoading(false);
            return;
        }

        // Prepare the data to send to the backend
        const eventData = {
            title: inputs.title,
            subTitle: inputs.subTitle,
            description: inputs.description,
            location: inputs.location,
            joinLink: inputs.joinLink,
            date: inputs.date,
            createdByClub: clubId, // Ensure this is correctly set
        };

        try {
            if (isEdit && eventId) {
                // Update the existing event using updateEvent API function
                const updatedEvent = await updateEvent(eventId, eventData);
                setSuccess("Event updated successfully!");
            } else {
                // Create a new event using createEvent API function
                const newEvent = await createEvent(eventData);
                setSuccess("Event created successfully!");
                // Optionally reset the form after creation
                setInputs({
                    title: "",
                    subTitle: "",
                    description: "",
                    location: "",
                    joinLink: "",
                    date: "",
                });
            }
        } catch (err) {
            console.error("Error submitting the form:", err);
            if (err.response) {
                if (err.response.data.message === 'Missing required fields') {
                    const missing = err.response.data.missingFields;
                    const missingList = Object.keys(missing)
                        .filter(field => missing[field])
                        .map(field => field.charAt(0).toUpperCase() + field.slice(1))
                        .join(', ');
                    setError(`Missing required fields: ${missingList}`);
                } else {
                    setError(err.response.data.message || "An error occurred. Please try again.");
                }
            } else if (err.request) {
                setError("No response from server. Please check your network connection.");
            } else {
                setError("An unexpected error occurred. Please try again.");
            }
        } finally {
            setLoading(false);
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
                                    input="title"
                                    type="text"
                                    label="Title"
                                    placeholder="A short, descriptive name for the activity"
                                    required={true}
                                    name="title"
                                    value={inputs.title}
                                    onChange={handleInputChange}
                                />

                                <NormInput
                                    inputs={inputs}
                                    setInputs={setInputs}
                                    input="subTitle"
                                    type="text"
                                    label="Subtitle"
                                    placeholder="Your Subtitle Here"
                                    required={true}
                                    name="subTitle"
                                    value={inputs.subTitle}
                                    onChange={handleInputChange}
                                />

                                <Textarea
                                    inputs={inputs}
                                    setInputs={setInputs}
                                    input="description"
                                    label="Description"
                                    placeholder="A detailed explanation of the activity/news"
                                    required={true}
                                    name="description"
                                    value={inputs.description}
                                    onChange={handleInputChange}
                                />

                                <NormInput
                                    inputs={inputs}
                                    setInputs={setInputs}
                                    input="location"
                                    type="text"
                                    label="Location (Optional)"
                                    placeholder="Event location"
                                    required={false}
                                    name="location"
                                    value={inputs.location}
                                    onChange={handleInputChange}
                                />

                                <NormInput
                                    inputs={inputs}
                                    setInputs={setInputs}
                                    input="date"
                                    type="datetime-local"
                                    label="Event Date & Time"
                                    placeholder="Select date and time"
                                    required={true}
                                    name="date"
                                    value={inputs.date}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </Col>
                        <Col>
                            <div className="wid-colum">
                                <Link
                                    inputs={inputs}
                                    setInputs={setInputs}
                                    input="joinLink"
                                    type="text"
                                    label="Join Link (Optional)"
                                    placeholder="https://join.link"
                                    name="joinLink"
                                    value={inputs.joinLink}
                                    onChange={handleInputChange}
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
                                        className="inputs-btn back"
                                        type="button"
                                        onClick={() => {
                                            navigate("/clubleaderHomePage");
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        className="inputs-btn"
                                        type="submit"
                                        disabled={loading}
                                    >
                                        {loading ? "Submitting..." : isEdit ? "Update" : "Submit"}
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
