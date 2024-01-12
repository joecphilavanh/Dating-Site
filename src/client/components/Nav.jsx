import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';
import "../styles/Nav.css";

function Navbar() {
    const navigate = useNavigate();
    // State to track if the user is logged in
    const [loggedIn, setLoggedIn] = useState(false);

    // Check if user is logged in
    useEffect(() => {
        // Define an async function to get the current session
        const checkSession = async () => {
            // Retrieve the current session from Supabase
            const { data: { session } } = await supabase.auth.getSession();
            // Update loggedIn state based on session existence
            setLoggedIn(!!session);
        };

        // Call the checkSession function when the component mounts
        checkSession();
    }, []); // Empty dependency array to run only on component mount

    // Logout function
    const handleLogout = async () => {
        try {
            // Sign out using Supabase auth
            await supabase.auth.signOut();
            // Redirect to the home page after logout
            navigate('/');
            // Update loggedIn state to false as user is now logged out
            setLoggedIn(false);
        } catch (error) {
            // Log any errors during the logout process
            console.error('Error during logout:', error);
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                {/* Link to the home page */}
                <Link to="/">logo</Link>
            </div>
            {/* Conditional rendering based on the loggedIn state */}
            {loggedIn && (
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
