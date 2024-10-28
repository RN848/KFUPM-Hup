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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
