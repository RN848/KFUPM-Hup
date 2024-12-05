
// // src/pages/SignUp.js
// import Body from "../components/Body";
// import "../styles/pages/_logIn.scss";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const SignUp = () => {
//   const [data, setData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "normal", // Default role is "normal" or "Student"
//   });
//   const [error, setError] = useState("");
//   const [message, setMessage] = useState(""); // For displaying success messages
//   const navigate = useNavigate();

//   const emailRegex = /^[a-zA-Z0-9._%+-]+@kfupm\.edu\.sa$/;

//   const handleChange = ({ currentTarget: input }) => {
//     setData({ ...data, [input.name]: input.value });
//     setError("");
//     setMessage("");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!emailRegex.test(data.email)) {
//       setError("Please enter a valid KFUPM email (e.g., yxxxxxxxxx@kfupm.edu.sa).");
//       return;
//     }

//     try {
//       const url = "http://localhost:5000/api/userRoutes/Sign-Up"; 
//       const { data: res } = await axios.post(url, data);
//       setMessage(res.message);

//       // Request a new OTP after successful registration
//       await axios.post("http://localhost:5000/api/otpRoutes/request-otp", { email: data.email });

//       // Redirect to OTP verification page
//       navigate("/verify-otp");
//     } catch (err) {
//       if (err.response && err.response.status >= 400 && err.response.status <= 500) {
//         setError(err.response.data.message);
//       } else {
//         setError("An unexpected error occurred. Please try again.");
//       }
//     }
//   };

//   return (
//     <Body>
//       <div className="login-container">
//         <h1 className="main-heading">Welcome to KFUPM HUB</h1>
//         <div className="login-form">
//           <h2 className="login-title">Sign Up</h2>
//           <form onSubmit={handleSubmit}>
//             <label htmlFor="name">Name</label>
//             <input
//               type="text"
//               name="name"
//               placeholder="Enter your name"
//               value={data.name}
//               onChange={handleChange}
//               required
//             />

//             <label htmlFor="email">Email</label>
//             <input
//               type="email"
//               name="email"
//               placeholder="Enter your KFUPM email"
//               value={data.email}
//               onChange={handleChange}
//               required
//             />

//             <label htmlFor="password">Password</label>
//             <input
//               type="password"
//               name="password"
//               placeholder="Enter your password"
//               value={data.password}
//               onChange={handleChange}
//               required
//             />

//             <button type="submit" className="login-btn">
//               Sign Up
//             </button>
//           </form>

//           {error && <div style={{color:"red"}}>{error}</div>}
//           {message && <div style={{color:"green"}}>{message}</div>}

//           <p style={{ textAlign: "center", color: "#ccc", marginTop: "1rem" }}>
//             Already have an account? Log in below.
//           </p>
//           <button className="signup-btn" onClick={() => navigate("/Log-In")}>
//             Log In
//           </button>
//         </div>
//       </div>
//     </Body>
//   );
// };

// export default SignUp;

















// src/pages/SignUp.js
import Body from "../components/Body";
import "../styles/pages/_logIn.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: "normal", // Default role
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  // Regular expression to validate the KFUPM email format
  const emailRegex = /^[a-zA-Z0-9._%+-]+@kfupm\.edu\.sa$/;

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
    setError("");
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check email format first
    if (!emailRegex.test(data.email)) {
      setError("Please enter a valid KFUPM email (e.g., yxxxxxxxxx@kfupm.edu.sa).");
      return;
    }

    try {
      setLoading(true); // Show loading screen when starting the request
      const url = "http://localhost:5000/api/userRoutes/Sign-Up"; 
      const { data: res } = await axios.post(url, data);
      setMessage(res.message);

      // After successful signup, instruct the user to request OTP separately
      // or redirect them to a page that instructs them to check their email or
      // navigate to an OTP request page.
      
      // For now, let's navigate them to /verify-otp to enter OTP
      // After successfully signing up:
navigate("/verify-otp", { state: { email: data.email } });


    } catch (err) {
      if (err.response && err.response.status >= 400 && err.response.status <= 500) {
        setError(err.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false); // Hide loading screen after request finishes
    }
  };

  return (
    <Body>
      {loading ? (
        // Loading screen or spinner
        <div className="login-container">
          <h1 className="main-heading">Loading...</h1>
          {/* You can add a spinner or any loading animation here */}
        </div>
      ) : (
        <div className="login-container">
          <h1 className="main-heading">Welcome to KFUPM HUB</h1>
          <div className="login-form">
            <h2 className="login-title">Sign Up</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={data.name}
                onChange={handleChange}
                required
              />

              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your KFUPM email"
                value={data.email}
                onChange={handleChange}
                required
              />

              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={data.password}
                onChange={handleChange}
                required
              />

              <button type="submit" className="login-btn">
                Sign Up
              </button>
            </form>

            {error && <div style={{ color: "red" }}>{error}</div>}
            {message && <div style={{ color: "green" }}>{message}</div>}

            <p style={{ textAlign: "center", color: "#ccc", marginTop: "1rem" }}>
              Already have an account? Log in below.
            </p>
            <button className="signup-btn" onClick={() => navigate("/Log-In")}>
              Log In
            </button>
          </div>
        </div>
      )}
    </Body>
  );
};

export default SignUp;
