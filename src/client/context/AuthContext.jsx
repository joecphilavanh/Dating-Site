import React, {createContext, useState, useEffect, useContext} from 'react';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isLoggedIn: false,
    userId: null,
    token: null,
    profileId: null,
    hasProfile: false,
    notifications: []
    });

  // Load auth state from localStorage on mount
  useEffect(() => {
    const savedAuthState = localStorage.getItem('authState');
    if (savedAuthState) {
      setAuthState(JSON.parse(savedAuthState));
    }
  }, []);

  const updateAuthState = (newState) => {
    console.log("Updating Auth State:", newState);
    setAuthState(prevState => {
      const updatedState = { ...prevState, ...newState };
      localStorage.setItem('authState', JSON.stringify(updatedState));
      return updatedState;
    });
  };

  const logout = () => {
    console.log("Logging out");
    localStorage.removeItem('authState');
    setAuthState({ isLoggedIn: false, userId: null, token: null, profileId: null, hasProfile: false, notifications: [] });
  };

  const setProfile = (profileId) => {
    console.log("Setting Profile ID:", profileId);
    updateAuthState({ profileId, hasProfile: true });
  };

  const updateNotifications = (notifications) => {
    console.log("Updating Notifications:", notifications);
    updateAuthState({ notifications });
  };
  console.log("Current Auth State:", authState);

  return (
      <AuthContext.Provider value={{ ...authState, updateAuthState, logout, setProfile, updateNotifications }}>
        {children}
      </AuthContext.Provider>
  );
};

export default AuthProvider;
