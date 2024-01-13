import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Importing the useAuth hook from  Auth context

const LandingPage = () => {
    const { isLoggedIn } = useAuth(); // Using isLoggedIn from Auth context

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
