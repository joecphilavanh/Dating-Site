import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
    // State to hold form data
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    // State to hold error messages
    const [errorMessage, setErrorMessage] = useState('');

    // Get the login function from the Auth context
    const { login } = useAuth();

    // Hook to programmatically navigate to different routes
    const navigate = useNavigate();

    // Update formData state when input fields change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle the form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        setErrorMessage(''); // Reset error message on new submission

        try {
            // Send a POST request to the registration endpoint
            const response = await fetch('http://localhost:3000/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            // Check if the response is successful
            if (!response.ok) {
                setErrorMessage('Registration failed'); // Set error message for the user
            } else {
                const result = await response.json();
                login(result.token, result.userId); // Pass both token and userId to login
                navigate('/matches'); // Navigate to the Matches page
            }
        } catch (error) {
            console.error('Error during registration:', error);
            setErrorMessage('An error occurred during registration'); // Set a generic error message
        }
    };

    // JSX for the registration form
    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <button type="submit">Register</button>
            </form>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
        </div>
    );
};

export default Register;