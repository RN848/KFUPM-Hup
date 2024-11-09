import "./App.css";
import "./styles/main.css";

import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";

import CreateActivity from "./pages/CreateActivity";
import ManageProfile from "./pages/ManageProfile";
import YourProfile from "./pages/YourProfile";

import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import NewClup from "./pages/NewClup";
import SportsReserve from "./pages/SportsReserve";
import NewReservation from "./pages/NewReservation";
import ReservationSuccess from "./pages/ReservationSuccess";
import LatestNews from "./pages/LatestNews";
import EditActivity from "./pages/EditActivity";
import LatestNewsAndActivites from "./pages/LatestNewsAndActivites";
import ActivityView from "./pages/ActivityView"

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route index element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} />

          <Route path="Create-Activity-news" element={<CreateActivity />} />
          {/*{frame 13}*/}

          <Route path="Manage-Profile" element={<ManageProfile />} />
          {/*{frame 14}*/}

          <Route path="Your-Profile" element={<YourProfile />} />
          {/*{frame 20}*/}

          <Route path="Log-In" element={<LogIn />} />
          {/*{frame 18}*/}

          <Route path="Sign-Up" element={<SignUp />} />
          {/*{frame 19}*/}

          <Route path="New-Clup" element={<NewClup />} />
          {/*{frame 22}*/}

          <Route path="Sports-reservation" element={<SportsReserve />} />
          {/*{frame 22}*/}

          <Route path="Latest-News" element={<LatestNews />} />
          {/*{frame 8}*/}

          <Route path="edit-Activity" element={<EditActivity />} />
          {/*{frame 15}*/}

          <Route path="new-reservation" element={<NewReservation />} />
          {/*{frame 3}*/}

          <Route path="reservaion-success" element={<ReservationSuccess />} />
          {/*{frame 4}*/}


          <Route path="latest-newsAndActivity" element={<LatestNewsAndActivites />} />
          {/*{frame 7}*/}

          <Route path="activity-view" element={<ActivityView />} />
          {/*{frame 7}*/}

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
