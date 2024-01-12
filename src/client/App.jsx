import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import LandingPage from "./components/LandingPage";
import ChatRoom from "./components/ChatRoom";
import Profile from "./components/Profile";
import Matches from "./components/Matches";
const App = () => {
  return (
    <Router>
             <Nav />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/chat" element={<ChatRoom />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/matches" element={<Matches />} />
      </Routes>
    </Router>
  );
}
export default App;
