import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const backgroundImage = "/1.png";

const LandingPage = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  if (isLoggedIn) {
    navigate("/matches");
    return null;
  }

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
      className="h-screen w-full flex flex-col justify-center p-8"
    >
      <div className="custom-width ">
        <h1 className="title-text">Welcome to Love's Journey!</h1>
        <p className="regular-text">
          <span className="highlight-text">Pucker Up</span> for an adventure
          where hearts collide and stories unfold.
        </p>
        <p className="regular-text">
          We're dedicated to creating magical connections. Like, chat, and
          discover your perfect match today.
        </p>
        <p className="regular-text">
          Dive into a world where love is around every corner, waiting for a
          chance to blossom. Join us now and be ready to pucker up for the kiss
          of destiny!
        </p>
        <p className="final-text">
          Find Your Match. Start Your Story. Pucker Up for Love.
        </p>
        <div className="flex flex-col space-y-2">
          <div className="flex flex-row space-x-2">
            {" "}
            <Link to="/login" className="flex-grow login-button">
              Login
            </Link>
            <Link to="/register" className="flex-grow join-now-button">
              Join Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
