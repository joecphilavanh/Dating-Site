import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check for the token in localStorage (you can also use cookies)
        const token = localStorage.getItem('token');

        if (token) {
            setIsLoggedIn(true);
            // You may want to verify the token on the server here as well
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const login = (token) => {
        // Set the user as logged in and store the token
        setIsLoggedIn(true);
        localStorage.setItem('token', token);
    };

    const logout = () => {
        // Set the user as logged out and remove the token
        setIsLoggedIn(false);
        localStorage.removeItem('token');
    };

    const value = {
        isLoggedIn,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
