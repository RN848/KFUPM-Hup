import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Body from "../components/Body";
import "../styles/main.css";
import "../styles/pages/_logIn.scss";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { NormInput } from "../components/Inputs";
import { createClub } from "../api/apiClubService";
import { fetchUserProfile, fetchUserProfileById, signUpUser } from "../api/apiUserService";

const NewClub = () => {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    clubName: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Helper to generate club account email
  const generateClubEmail = (clubName) => {
    const sanitizedClubName = clubName.replace(/\s+/g, "").toLowerCase(); // Remove spaces and convert to lowercase
    return `${sanitizedClubName}@kfupm.edu.sa`;
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);
    setSuccess(null);

    if (!inputs.clubName.trim() || !inputs.description.trim()) {
      setError("Please fill in all the fields.");
      return;
    }

    setLoading(true);

    try {
      // Create a club account user first
      const clubEmail = generateClubEmail(inputs.clubName);
      const clubPassword = `${inputs.clubName}_1H`; // Generate a simple password
      const clubAccount = await signUpUser({
        name: inputs.clubName,
        email: clubEmail,
        password: clubPassword,
        role: "clubAccount",
      });
      clubAccount.Account.otpVerified = true;
      // Create the club with the newly created account
      const response = await createClub({
        name: inputs.clubName,
        description: inputs.description,
        clubAccount: clubAccount.Account._id, // Assuming the response includes the new account's ID
      });

      setSuccess(`Club "${response.name}" has been created successfully!`);

      // Reset the form inputs
      setInputs({
        clubName: "",
        description: "",
      });

      // Optionally navigate to the new club's profile page
      setTimeout(() => {
        alert(`clubEmail ${clubEmail} clubPassword ${clubPassword}`);
        navigate('/club-profile', { state: { clubId: response._id } });
      }, 2000);
    } catch (err) {
      console.error("Error creating club:", err);
      setError(
        err.response?.data?.message || "An unexpected error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Body>
      <div className="login-container">
        <h1 className="main-heading" style={{ color: "white" }}>
          New Club
        </h1>
        <div className="login-form">
          {success && <Alert variant="success">{success}</Alert>}
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
              disabled={loading}
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
