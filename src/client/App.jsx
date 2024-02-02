import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import LandingPage from "./components/LandingPage";
import Register from "./components/Register";
// import ChatRoom from "./components/ChatRoom";
import ProfileCreation from "./components/ProfileCreation";
import Profile from "./components/Profile";
import Matches from "./components/Matches";
import Login from "./components/Login";
import AuthProvider  from "./context/AuthContext";
import DiscoveringPeople from "./components/DiscoveringPeople";
import ViewProfile from "./components/ViewProfile";
import SendMessage from "./components/SendMessage";
import Messages from "./components/Messages";
import Dms from "./components/Dms";
import { SocketProvider } from "./context/socketContext";
import Notifications from "./components/Notifications";
const App = () => {
  return (
      <AuthProvider>
        <Router>
          <Nav />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            {/*<Route path="/chat" element={<ChatRoom />} />*/}
            <Route path="/createprofile" element={<ProfileCreation />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/matches" element={<Matches />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/discover" element={<DiscoveringPeople />} />
            <Route path="/profile/:profileId" element={<ViewProfile />} />
            <Route path="/messages" element={
              <SocketProvider>
                <Messages />
              </SocketProvider>
            } />
            <Route path="/send-message/:receiverId" element={
              <SocketProvider>
                <SendMessage />
              </SocketProvider>
            } />
            <Route path="/dms" element={
              <SocketProvider>
                <Dms />
              </SocketProvider>
            } />
            <Route path="/messages/:selectedUserId" element={
              <SocketProvider>
                <Messages />
              </SocketProvider>
            } />
            <Route path="/notifications" element={
              <SocketProvider>
                <Notifications />
              </SocketProvider>
            } />
          </Routes>
        </Router>
      </AuthProvider>
  );
};

export default App;
