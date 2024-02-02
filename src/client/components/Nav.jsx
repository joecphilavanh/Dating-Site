import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
function Navbar() {
  const navigate = useNavigate();
  const { isLoggedIn, logout, profileId } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-gray-800 flex justify-between items-center p-2 text-white shadow-md">
      <div className="flex items-center">
        <Link to="/">
          <img
            src="logohearts.png"
            alt="Pucker Up Logo"
            className="max-h-[100px] h-auto ml-4"
          />
        </Link>
      </div>
      {isLoggedIn && (
        <div className="flex items-center space-x-4 mr-4">
          {profileId ? (
            <>
              <Link
                to="/discover"
                className="text-white hover:text-red-500 transition duration-300"
              >
                Discover
              </Link>
              <Link
                to="/matches"
                className="text-white hover:text-red-500 transition duration-300"
              >
                Matches
              </Link>

              <Link
                to="/dms"
                className="text-white hover:text-red-500 transition duration-300"
              >
                DMs
              </Link>

              <Link
                to="/profile"
                className="text-white hover:text-red-500 transition duration-300"
              >
                Profile
              </Link>
            </>
          ) : (
            <Link
              to="/createprofile"
              className="text-white hover:text-red-500 transition duration-300"
            >
              Create Profile
            </Link>
          )}

          <Link to="/notifications" className="relative text-white hover:text-red-500 transition duration-300">
            <FontAwesomeIcon icon={faBell} />
          </Link>
          <button
            onClick={handleLogout}
            className="text-red-500 px-2 py-1 rounded-md hover:text-red-600 hover:bg-gray-800 transition duration-300"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
