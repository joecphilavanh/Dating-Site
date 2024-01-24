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
  const [profileId, setProfileId] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const userToken = localStorage.getItem("token");
    const savedUserId = localStorage.getItem("user_id");
    const savedProfileId = localStorage.getItem("profile_id");

    if (userToken && savedUserId) {
      setIsLoggedIn(true);
      setUserId(savedUserId);
      setToken(userToken);
      setCustomSupabaseClient(createSupabaseClientWithToken(userToken));
    } else {
      setIsLoggedIn(false);
      setUserId(null);
      setCustomSupabaseClient(null);
    }

    if (savedProfileId) {
      setProfileId(savedProfileId);
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

  const setProfile = (profile) => {
    setProfileId(profile);
    localStorage.setItem("profile_id", profile);
  };

  const value = {
    isLoggedIn,
    login,
    logout,
    setProfile,
    profileId,
    userId,
    supabase: customSupabaseClient,
    token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
