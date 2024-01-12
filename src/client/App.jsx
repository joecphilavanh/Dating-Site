// App.js
import React, { useEffect, useState } from 'react';
import { UserContext } from './UserContext';
import { supabase } from './supabaseClient';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import AuthenticatedPage from './components/AuthenticatedPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    // Check active sessions and set user
    const session = supabase.auth.session();
    setUser(session?.user || null);
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });
    // Cleanup on component unmount
    return () => {
      listener?.unsubscribe();
    };
  }, []);
  return (
    <UserContext.Provider value={user}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {user && <Route path="/dashboard" element={<AuthenticatedPage />} />}
          {/* Add other routes here */}
        </Routes>
      </Router>
      </UserContext.Provider> 
        );
      }