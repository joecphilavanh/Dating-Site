import { createContext, useState, useContext, useEffect } from 'react';

export const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState(null); // State for user_id

    useEffect(() => {
        // Function to check if the user is already authenticated
        const checkAuthentication = async () => {
            const token = localStorage.getItem('token');
            const savedUserId = localStorage.getItem('user_id'); // Get user_id from localStorage

            if (token && savedUserId) {
                setIsLoggedIn(true);
                setUserId(savedUserId); // Set the user_id in state
            } else {
                setIsLoggedIn(false);
                setUserId(null);
            }
        };

        // Call the function to check authentication
        checkAuthentication();
    }, []);

    const login = (token, userId) => {
        setIsLoggedIn(true);
        localStorage.setItem('token', token);
        localStorage.setItem('user_id', userId); // Store user_id in localStorage
        setUserId(userId); // Update user_id in state
    };

    const logout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('token');
        localStorage.removeItem('user_id'); // Remove user_id from localStorage
        setUserId(null); // Reset user_id in state
    };

    const value = {
        isLoggedIn,
        login,
        logout,
        userId // Provide userId in the context
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
