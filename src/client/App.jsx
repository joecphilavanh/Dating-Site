import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import LandingPage from "./components/LandingPage";
import ChatRoom from "./components/ChatRoom";
import ProfileCreation from "./components/ProfileCreation";


const App = () => {
  return (
    <Router>
             <Nav />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/chat" element={<ChatRoom />} />
        <Route path="/ProfileCreation" element={<ProfileCreation />} />

      </Routes>
    </Router>
  );
}
export default App;
