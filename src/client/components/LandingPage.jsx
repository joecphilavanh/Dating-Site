import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabase';

const LandingPage = () => {
    // State to keep track of whether the user is logged in
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Define an async function to get the current session
        async function getSession() {
            try {
                // Attempt to retrieve the current session from Supabase
                const { data, error } = await supabase.auth.getSession();

                // If there is an error, log it and exit early
                if (error) {
                    console.error('Error retrieving session:', error);
                    return; // Early return on error
                }

                // Update the isLoggedIn state based on the session data
                setIsLoggedIn(!!data.session);
            } catch (error) {
                // Catch and log any unhandled errors during the session retrieval
                console.error('Unhandled error:', error);
            }
        }

        // Call the getSession function
        getSession();
    }, []); // Empty dependency array to run only on component mount

    return (
        <div>
            {/* Conditional rendering based on the isLoggedIn state */}
            {isLoggedIn ? (
                // Display this block if the user is logged in
                <div>Display Matches Here</div>
            ) : (
                // Display this block if the user is not logged in
                <div>
                    <h2>Welcome to Our Dating App</h2>
                    <Link to="/login">Login</Link>
                    <br />
                    <Link to="/register">Register</Link>
                </div>
            )}
        </div>
    );
};

export default LandingPage;
