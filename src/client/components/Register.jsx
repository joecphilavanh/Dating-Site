import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import backgroundImage from "/6.jpg";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const { updateAuthState } = useContext(AuthContext);
  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Registration failed. Please try again.");
        console.error("Registration Error:", errorData);
        return;
      }

      const { token, userId } = await response.json();
      console.log("Registration Success:", { userId, token });

      updateAuthState({
        isLoggedIn: true,
        userId,
        token,
        profileId: null,
        hasProfile: false,
      });

      navigate("/createprofile");
    } catch (error) {
      console.error("Error during registration:", error);
      setErrorMessage("An unexpected error occurred. Please try again.");
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
        <div className="custom-width">
          <h1 className="title-text">Welcome to Love's Journey!</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"
            />
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"
            />
            <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"
            />
            <button type="submit" className="flex-grow login-button">
              Register
            </button>
            <Link to="/login" className="flex-grow login-button">
              Already have an account? Login
            </Link>
          </form>
          {errorMessage && (
              <div className="text-red-500 text-center mt-2">{errorMessage}</div>
          )}
        </div>
      </div>
  );
};

export default Register;
