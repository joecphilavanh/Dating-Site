import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import LandingPage from "./components/LandingPage";
import Register from "./components/ Register";
import ChatRoom from "./components/ChatRoom";
import Profile from "./components/Profile";
import Matches from "./components/Matches";
import Login from "./components/Login";
import {AuthProvider} from "./context/AuthContext";

const App = () => {
  return (
  <AuthProvider>
    <Router>
        <Nav />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/chat" element={<ChatRoom />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/matches" element={<Matches />} />
        <Route path="/login" element={<Login />} />
        <Route path={"/register"} element={<Register />} />
      </Routes>
    </Router>
  </AuthProvider>
  );
};
export default App;
