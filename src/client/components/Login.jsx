import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Importing the useAuth hook

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth(); // Using the login function from Auth context

    // Function to handle the login form submission
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Send a POST request to the login endpoint with email and password
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                console.error('Login failed');
                return;
            }

            // If login is successful, parse the response JSON
            const result = await response.json();

            // Call the login function from the Auth context to set user authentication
            login(result.token, result.userId); // Pass both token and userId to login

            // Redirect to the 'matches' page on successful login
            navigate('/matches');
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                {/* Input for email */}
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                {/* Input for password */}
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                {/* Button to submit the login form */}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
