import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
    const navigate = useNavigate();
    const { isLoggedIn, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <nav className="bg-gray-800 flex justify-between items-center pl-2 pr-2 text-white shadow-md">
            <div className="flex items-center">
                <Link to="/">
                    <img
                        src="logohearts.png"
                        alt="Pucker Up Logo"
                        className="max-w-[320px] h-auto ml-4"
                    />
                </Link>
            </div>
            {isLoggedIn && (
                <div className="flex items-center space-x-4 mr-4">
                    <Link
                        to="/matches"
                        className="text-white hover:text-red-500 transition duration-300"
                    >
                        Matches
                    </Link>
                    <Link
                        to="/profile"
                        className="text-white hover:text-red-500 transition duration-300"
                    >
                        Profile
                    </Link>
                    <Link
                        to="/notifications"
                        className="text-white hover:text-red-500 transition duration-300"
                    >
                        Notifications
                    </Link>
                    <Link
                        to="/chat"
                        className="text-white hover:text-red-500 transition duration-300"
                    >
                        Chat
                    </Link>
                    <Link
                        to="/createprofile"
                        className="text-white hover:text-red-500 transition duration-300"
                    >
                        Create Profile
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="text-red-500 px-2 py-1 rounded-md border border-red-500 hover:text-red-600 hover:bg-gray-800 transition duration-300"
                    >
                        Logout
                    </button>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
