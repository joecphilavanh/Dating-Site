import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import LandingPage from "./components/LandingPage";
import Register from "./components/Register";
import ChatRoom from "./components/ChatRoom";
import ProfileCreation from "./components/ProfileCreation";
import Profile from "./components/Profile";
import Matches from "./components/Matches";
import Login from "./components/Login";
import { AuthProvider } from "./context/AuthContext";
import DiscoveringUser from "./components/DiscoveringUser";


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/chat" element={<ChatRoom />} />
          <Route path="/createprofile" element={<ProfileCreation />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/discover" element={<DiscoveringUser />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
