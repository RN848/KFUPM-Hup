import "./App.css";
import "./styles/main.css";

import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import { Suspense } from "react";

import CreateActivity from "./pages/CreateActivity";
import ManageProfile from "./pages/ManageProfile";
import YourProfile from "./pages/YourProfile";

import LogIn from "./pages/LogIn";
import LogOut from "./pages/LogOut.js";
import SignUp from "./pages/SignUp";
import NewClub from "./pages/NewClub";
import SportsReserve from "./pages/SportsReserve";
import NewReservation from "./pages/NewReservation";
import ReservationSuccess from "./pages/ReservationSuccess";
import ReservationDetails from "./pages/ReservationDetails";
import LatestNews from "./pages/LatestNews";
import EditActivity from "./pages/EditActivity";
import NewsAndClubs from "./pages/NewsAndClubs";
import ActivityView from "./pages/ActivityView";
import ClubMembers from "./pages/ClubMembers";
import ClubProfile from "./pages/ClubProfile";
import "bootstrap/dist/css/bootstrap.min.css";
import MemberProfile from "./pages/MemberProfile";
import Clubs from "./pages/Clubs";
import EditClub from "./pages/EditClub";
import ErrorPage from "./pages/ErrorPage";
import LoadingPage from "./pages/LoadingPage";
import ClLeadHomePage from "./pages/ClLeadHomePage";
import ProtectedRoute from "./components/ProtectedRoute";

// OTP Pages (import these if they are available)
import RequestOTPForm from "./pages/RequestOTPForm";  // OTP request page
import VerifyOTPForm from "./pages/VerifyOTPForm";    // OTP verify page

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          <Route>
            <Route index element={<LogIn />} />
            {/*{frame 18}*/}

            {/* OTP Routes */}
            <Route path="/request-otp" element={<RequestOTPForm />} />
            <Route path="/verify-otp" element={<VerifyOTPForm />} />

            {/* Protected Routes */}
            <Route
              path="home"
              element={<ProtectedRoute element={<Home />} />}
            />
            <Route
              path="Create-Activity-news"
              element={<ProtectedRoute element={<CreateActivity />} />}
            />
            <Route
              path="Manage-Profile"
              element={<ProtectedRoute element={<ManageProfile />} />}
            />
            <Route
              path="Your-Profile"
              element={<ProtectedRoute element={<YourProfile />} />}
            />
            <Route
              path="New-Club"
              element={<ProtectedRoute element={<NewClub />} />}
            />
            <Route
              path="Sports-reservation"
              element={<ProtectedRoute element={<SportsReserve />} />}
            />
            <Route
              path="Latest-News"
              element={<ProtectedRoute element={<LatestNews />} />}
            />
            <Route
              path="edit-Activity"
              element={<ProtectedRoute element={<EditActivity />} />}
            />
            <Route
              path="new-reservation"
              element={<ProtectedRoute element={<NewReservation />} />}
            />
            <Route
              path="reservation-success"
              element={<ProtectedRoute element={<ReservationSuccess />} />}
            />
            <Route
              path="news-clubs"
              element={<ProtectedRoute element={<NewsAndClubs />} />}
            />
            <Route
              path="activity-view"
              element={<ProtectedRoute element={<ActivityView />} />}
            />
            <Route
              path="reservation-details"
              element={<ProtectedRoute element={<ReservationDetails />} />}
            />
            <Route
              path="club-members"
              element={<ProtectedRoute element={<ClubMembers />} />}
            />
            <Route
              path="member-profile"
              element={<ProtectedRoute element={<MemberProfile />} />}
            />
            <Route
              path="clubs"
              element={<ProtectedRoute element={<Clubs />} />}
            />
            <Route
              path="edit-club"
              element={<ProtectedRoute element={<EditClub />} />}
            />
            <Route
              path="club-profile"
              element={<ProtectedRoute element={<ClubProfile />} />}
            />
            <Route
              path="clubleaderHomePage"
              element={<ProtectedRoute element={<ClLeadHomePage />} />}
            />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<ErrorPage />} />
            <Route path="/loading" element={<LoadingPage />} />
            <Route path="/error" element={<ErrorPage />} />
            <Route path="Sign-Up" element={<SignUp />} />
            <Route path="Log-In" element={<LogIn />} />
            <Route path="/LogOut" element={<LogOut />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
