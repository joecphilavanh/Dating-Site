import { createContext, useState, useContext, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_KEY;

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const createSupabaseClientWithToken = (token) => {
  return createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    },
  });
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [customSupabaseClient, setCustomSupabaseClient] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUserId = localStorage.getItem("user_id");

    if (token && savedUserId) {
      setIsLoggedIn(true);
      setUserId(savedUserId);
      setCustomSupabaseClient(createSupabaseClientWithToken(token));
    } else {
      setIsLoggedIn(false);
      setUserId(null);
      setCustomSupabaseClient(null);
    }
  }, []);

  const login = (token, userId) => {
    setIsLoggedIn(true);
    localStorage.setItem("token", token);
    localStorage.setItem("user_id", userId);
    setUserId(userId);
    setCustomSupabaseClient(createSupabaseClientWithToken(token));
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    setUserId(null);
    setCustomSupabaseClient(null);
  };

  const value = {
    isLoggedIn,
    login,
    logout,
    userId,
    supabase: customSupabaseClient,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
