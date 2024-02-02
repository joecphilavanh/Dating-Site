import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import backgroundImage from "/6.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { updateAuthState } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        console.error("Login failed");
        return;
      }

      const { token, userId } = await response.json();

      // Check if the user has a profile
      const profileResponse = await fetch(`/api/profile/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      let hasProfile = false;
      let profileId = null;

      if (profileResponse.ok) {
        const profileData = await profileResponse.json();
        hasProfile = true;
        profileId = profileData.profile_id;
      }

      // Update the auth state with the new information
      updateAuthState({
        isLoggedIn: true,
        userId,
        token,
        profileId,
        hasProfile,
      });
      console.log(profileId);

      navigate(hasProfile ? "/matches" : "/createprofile");
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
      className="h-screen w-full flex flex-col justify-center p-8"
    >
      <div className="custom-width ">
        <h1 className="title-text">Pucker Up!</h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"
          />
          <button type="submit" className="flex-grow login-button">
            Login
          </button>
          <Link to="/register" className="flex-grow join-now-button">
            Join Now
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
