import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';

const Login = () => {
    // State for storing email and password entered by the user
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Function to check if a user is already logged in
        const checkSession = async () => {
            // Get the current session
            const { data: { session } } = await supabase.auth.getSession();
            // If a session exists, navigate to the 'matches' page
            if (session) {
                navigate('/matches');
            }
        };

        // Call the checkSession function when the component mounts
        checkSession();
    }, [navigate]); // Dependency array with navigate to re-run the effect if navigate changes

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent the default form submit action
        try {
            // Attempt to sign in with the provided email and password
            const { error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) {
                // Log the error if sign-in fails
                console.error('Error logging in:', error);
                return;
            }
            // Navigate to the 'matches' page upon successful login
            navigate('/matches');
        } catch (error) {
            // Catch and log any unhandled errors during the login process
            console.error('Error during login:', error);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                {/* Email input field */}
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                {/* Password input field */}
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                {/* Submit button */}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;

