import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Importing the useAuth hook from Auth context
import "../styles/Nav.css";

function Navbar() {
    const navigate = useNavigate();
    const { isLoggedIn, logout } = useAuth(); // Destructuring isLoggedIn and logout from the context

    // Handle the logout process
    const handleLogout = () => {
        logout(); // Call the logout function from your Auth context
        navigate('/'); // Redirect to the home page after logging out
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                {/* Link to the home page */}
                <Link to="/"><img src="logohearts.png" alt="Pucker Up Logo" className="logo-image" /></Link>
            </div>
            {/* Conditional rendering based on the isLoggedIn state */}
            {isLoggedIn && (
                <div className="navbar-right">
                    {/* Navigation links that are shown when the user is logged in */}
                    <Link to="/matches" className="navbar-link">Matches</Link>
                    <Link to="/profile" className="navbar-link">Profile</Link>
                    <Link to="/notifications" className="navbar-link">Notifications</Link>

                    {/* Logout button */}
                    <button onClick={handleLogout} className="navbar-link button">Logout</button>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
