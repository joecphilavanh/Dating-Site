import { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '../supabase';

export const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const setSupabaseJwt = (token) => {
    supabase.auth.session = () => ({
        access_token: token,
        token_type: "bearer",
        user: null,
        expires_at: null,
        refresh_token: null
    });
};

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const checkAuthentication = async () => {
            const token = localStorage.getItem('token');
            const savedUserId = localStorage.getItem('user_id');

            if (token && savedUserId) {
                setIsLoggedIn(true);
                setUserId(savedUserId);
                setSupabaseJwt(token); // Set JWT in Supabase client
            } else {
                setIsLoggedIn(false);
                setUserId(null);
            }
        };

        checkAuthentication();
    }, []);

    const login = (token, userId) => {
        setIsLoggedIn(true);
        localStorage.setItem('token', token);
        localStorage.setItem('user_id', userId);
        setUserId(userId);

        setSupabaseJwt(token);
    };

    const logout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
        setUserId(null);


        supabase.auth.signOut();
    };

    const value = {
        isLoggedIn,
        login,
        logout,
        userId
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
