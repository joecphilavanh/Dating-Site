import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import LandingPage from "./components/LandingPage";
const App = () => {
  return (
    <Router>
        <Nav />
        <Routes>
            <Route path="/" element={<LandingPage />} />
        </Routes>
    </Router>
  );
}

export default App;