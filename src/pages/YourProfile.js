import { useState, useEffect } from "react"; // Import hooks from React
import axios from "axios"; // Import axios for making API requests
import Body from "../components/Body"; // Import custom Body component for layout
import "../styles/main.css"; // Import main CSS file
import "../styles/master.css"; // Import additional styles
import Row from "react-bootstrap/Row"; // Import Row component from Bootstrap
import Col from "react-bootstrap/Col"; // Import Col component from Bootstrap
import Form from "react-bootstrap/Form"; // Import Form component from Bootstrap
import Button from "react-bootstrap/Button"; // Import Button component from Bootstrap
import { NormInput } from "../components/Inputs"; // Import NormInput component
import { Uplode } from "../components/Inputs"; // Import Uplode component (for file uploads)
import { Link } from "../components/Inputs"; // Import Link component (likely for links)
import { useNavigate } from "react-router-dom"; // Import useNavigate hook for navigation

const YourProfile = () => {
  // State to manage input values and form state
  const [inputs, setInputs] = useState({
    name: "",
    profilePicture: "No file chosen", // Default value for file upload
    interests: "",
    role: "",
    email: "",
    changePassword: "",
    contactNumber: "",
    linkedIn: "",
    id: "",
  });

  const [initialValues, setInitialValues] = useState(null); // Store the initial form data to reset form
  const [error, setError] = useState(""); // State for any error messages
  const [loading, setLoading] = useState(true); // State to track if data is still being fetched
  const navigate = useNavigate(); // Initialize navigation hook
  const apiUrl = process.env.REACT_APP_API_URL;

  // useEffect hook to fetch user profile data when the component is mounted
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token"); // Get token from local storage
        if (!token) {
          setError("No token found, please log in."); // If no token, show error message
          return;
        }

        // Fetch the profile data from the API
        const res = await fetch(
          `${apiUrl}/userRoutes/profile`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, // Send token in Authorization header
            },
          }
        );

        if (!res.ok) {
          setError("Failed to fetch user data."); // Handle unsuccessful response
          return;
        }

        const data = await res.json(); // Parse the response JSON

        // Save initial data to reset form to these values if needed
        setInitialValues(data.data);
        setInputs(data.data); // Set form data to the fetched user data
      } catch (err) {
        setError("Failed to fetch user data."); // Show error message if fetch fails
        console.error(err);
      } finally {
        setLoading(false); // Set loading to false after the fetch completes
      }
    };

    fetchData(); // Call fetchData function on component mount
  }, []); // Empty dependency array means this effect runs only once when the component mounts

  // Handle input changes (called on each input field change)
  const handleInputChange = ({ currentTarget: input }) => {
    setInputs({ ...inputs, [input.name]: input.value }); // Update the corresponding input field's value
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit triggered");
    console.log(inputs); // Prevent default form submission behavior
    setError(""); // Clear any previous errors

    // Basic validation for required fields
    if (!inputs.name) {
      setError("Name and other required fields are missing.");
      return;
    }

    try {
      const token = localStorage.getItem("token"); // Get the token again
      if (!token) {
        setError("Please log in first."); // Show error if no token
        return;
      }

      // Send PUT request to update the profile
      const response = await axios.put(
        `${apiUrl}/userRoutes/profile`,
        inputs,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Profile updated successfully!");
        console.log(inputs.id);

        // Assuming the response includes the updated data
        console.log(response.data); // Log the response to verify the updated data
        setInputs(response.data);
        navigate("/home"); // Redirect after successful update
      }
    } catch (err) {
      setError("Failed to update profile.");
      console.error("Error submitting profile data:", err.response || err);
    }
  };

  // Handle the cancel button click (reset form and navigate to home)
  const handleCancel = () => {
    if (initialValues) {
      setInputs(initialValues); // Reset form to initial values if available
    }
    navigate("/home"); // Redirect to the home page without saving
  };

  // If data is still loading, display loading message
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Body>
      {/* Render the Body component, which likely contains the main layout */}
      <div className="body">
        <h1>Your Profile</h1>
        {error && <div className="error">{error}</div>} {/* Display error message if any */}
        
        <Row className={"g-4 wid-row d-flex"} md={2} sm={1} xs={1}>
          <Col>
            <div className="wid-colum justify-content-center">
              {/* Single form to handle all input fields */}
              <Form className="form" onSubmit={handleSubmit}>
                {/* First form section */}
                <NormInput
                  inputs={inputs}
                  setInputs={setInputs}
                  input={"name"}
                  type={"text"}
                  label={"Name"}
                  placeholder={"Enter your name"}
                  onChange={handleInputChange} // Handle input change
                />
                <Uplode
                  setInputs={setInputs}
                  inputs={inputs}
                  input={"profilePicture"}
                  label={"Profile Picture"}
                  onChange={handleInputChange} // Handle file upload change
                />
                <NormInput
                  inputs={inputs}
                  setInputs={setInputs}
                  input={"interests"}
                  type={"text"}
                  label={"Interests"}
                  placeholder={"e.g., football, research"}
                  onChange={handleInputChange} // Handle input change
                />
                <NormInput
                  inputs={inputs}
                  setInputs={setInputs}
                  input={"role"}
                  type={"text"}
                  label={"Role"}
                  placeholder={"e.g., Student, Club Leader"}
                  onChange={handleInputChange} // Handle input change
                />
                {/* Second part of the form */}
                <NormInput
                  inputs={inputs}
                  setInputs={setInputs}
                  input={"email"}
                  type={"email"}
                  label={"Email"}
                  placeholder={"Enter your email"}
                  value={inputs.email} // Display the email in the input field
                  readOnly // Set email field to be read-only
                />
                <NormInput
                  inputs={inputs}
                  setInputs={setInputs}
                  input={"changePassword"}
                  type={"password"}
                  label={"Change Password"}
                  placeholder={"Enter new password"}
                  readOnly // Set password field to be read-only
                />
                <NormInput
                  inputs={inputs}
                  setInputs={setInputs}
                  input={"contactNumber"}
                  type={"text"}
                  label={"Contact Number"}
                  placeholder={"Enter contact number"}
                  onChange={handleInputChange} // Handle input change
                />
                <NormInput
                  inputs={inputs}
                  setInputs={setInputs}
                  input={"linkedIn"}
                  type={"text"}
                  label={"LinkedIn"}
                  placeholder={"Enter LinkedIn ID"}
                  onChange={handleInputChange} // Handle input change
                />
                <Link
                  inputs={inputs}
                  setInputs={setInputs}
                  input={"id"}
                  type={"text"}
                  label={"ID"}
                  placeholder={"User ID"}
                  onChange={handleInputChange} // Handle input change
                />
  
                {/* Buttons */}
                <div className="form">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "end",
                      gap: "20px",
                      marginTop: "50px",
                    }}
                  >
                    {/* Cancel Button */}
                    <Button
                      className={"inputs-btn back"}
                      as="input"
                      type="button"
                      value="Cancel"
                      onClick={handleCancel} // Navigate without saving
                      style={{ width: "120px" }} // Adjust button width to match previous styles
                    />
  
                    {/* Save Button */}
                    <Button
                      className={"inputs-btn"}
                      as="input"
                      type="submit" // Trigger form submission
                      value="Save"
                      style={{ width: "120px" }} // Adjust button width to match previous styles
                    />
                  </div>
                </div>
              </Form> {/* Closing the form tag here */}
            </div>
          </Col>
        </Row>
      </div>
    </Body>
  );
  
  
};

export default YourProfile; // Export the component for use in other parts of the app
