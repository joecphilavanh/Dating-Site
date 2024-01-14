import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Importing the useAuth hook from Auth context

const LandingPage = () => {
    const { isLoggedIn } = useAuth(); // Using isLoggedIn from Auth context
    const navigate = useNavigate(); // Get the navigate function from react-router-dom

    // Handle navigation to /matches if the user is logged in
    if (isLoggedIn) {
        navigate('/matches');
        return null; // Redirect, so no need to render anything here
    }

    return (
        <div>
            <h2>Welcome to Our Dating App</h2>
            <Link to="/login">Login</Link>
            <br />
            <Link to="/register">Register</Link>
        </div>
    );
};

export default LandingPage;
