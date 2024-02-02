import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
  const navigate = useNavigate();
  const { isLoggedIn, logout, notifications } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest('.notifications-dropdown-container')) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [showDropdown]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };


  return (
      <nav className="bg-gray-800 flex justify-between items-center p-2 text-white shadow-md">
        <div className="flex items-center">
          <Link to="/">
            <img src="logohearts.png" alt="Pucker Up Logo" className="max-h-[100px] h-auto ml-4"/>
          </Link>
        </div>
        {isLoggedIn && (
            <div className="flex items-center space-x-4 mr-4">
              <Link to="/discover" className="text-white hover:text-red-500 transition duration-300">Discover</Link>
              <Link to="/matches" className="text-white hover:text-red-500 transition duration-300">Matches</Link>
              <Link to="/dms" className="text-white hover:text-red-500 transition duration-300">DMs</Link>
              <Link to="/profile" className="text-white hover:text-red-500 transition duration-300">Profile</Link>
              <div className="notifications-dropdown-container relative">
                <FontAwesomeIcon icon={faBell} onClick={() => setShowDropdown(!showDropdown)} className="cursor-pointer"/>
                {showDropdown && (
                    <div className="notifications-dropdown absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-50" style={{maxHeight: '300px', overflowY: 'auto'}}>
                      {notifications.length > 0 ? (
                          notifications.map((notification, index) => (
                              <Link key={index}
                                    to={`/messages/${notification.senderId}`}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    onClick={() => setShowDropdown(false)}>
                                {notification.message}
                              </Link>
                          ))
                      ) : (
                          <div className="text-center px-4 py-2 text-sm text-gray-500">No notifications</div>
                      )}
                    </div>
                )}
              </div>

              <button onClick={handleLogout} className="text-red-500 px-2 py-1 rounded-md hover:text-red-600 hover:bg-gray-800 transition duration-300">
                Logout
              </button>
            </div>
        )}
      </nav>
  );
}

export default Navbar;