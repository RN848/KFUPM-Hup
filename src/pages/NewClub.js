// NewClub.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import Body from "../components/Body";
import "../styles/main.css";
import "../styles/pages/_logIn.scss";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert"; // Import Alert for feedback messages
import { NormInput } from "../components/Inputs";
import { createClub } from "../api/apiClubService"; // Import the createClub API function

const NewClub = () => {
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  const [inputs, setInputs] = useState({
    clubName: "",
    description: "",
    leader: "",
  });

  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const [success, setSuccess] = useState(null); // Success message state

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Reset previous messages
    setError(null);
    setSuccess(null);

    // Basic validation (optional)
    if (!inputs.clubName.trim() || !inputs.description.trim() ) {
      setError("Please fill in all the fields.");
      return;
    }

    setLoading(true); // Set loading state to true

    try {
      // Make the API call to create a new club
      const response = await createClub({
        name: inputs.clubName,
        description: inputs.description,
      });

      // Assuming the response contains the created club's data
      console.log(response)
      setSuccess(`Club "${response.name}" has been created successfully!`);

      // Optionally, navigate to the new club's profile page after a delay
      // Uncomment the following lines if you have a route for club profiles
      /*
      setTimeout(() => {
        navigate(`/club-profile/${response._id}`);
      }, 2000); // Redirect after 2 seconds
      */

      // Reset the form inputs
      setInputs({
        clubName: "",
        description: "",
      });
    } catch (err) {
      console.error("Error creating club:", err);
      // Handle different error responses based on your backend implementation
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
      <Body>
        <div className="login-container">
          <h1 className="main-heading" style={{ color: "white" }}>
            New Club
          </h1>
          <div className="login-form">
            {/* Display Success Message */}
            {success && <Alert variant="success">{success}</Alert>}

            {/* Display Error Message */}
            {error && <Alert variant="danger">{error}</Alert>}

            <Form className="form" onSubmit={handleSubmit}>
              <NormInput
                  inputs={inputs}
                  setInputs={setInputs}
                  input={"clubName"}
                  type={"text"}
                  label={"Club Name"}
                  placeholder={"Enter the club name"}
              />
              <NormInput
                  inputs={inputs}
                  setInputs={setInputs}
                  input={"description"}
                  type={"text"}
                  label={"Description"}
                  placeholder={"Description of Club"}
              />
             <Button
                  className="login-btn"
                  type="submit"
                  disabled={loading} // Disable button while loading
              >
                {loading ? "Creating..." : "Create"}
              </Button>
            </Form>
          </div>
        </div>
      </Body>
  );
};

export default NewClub;
