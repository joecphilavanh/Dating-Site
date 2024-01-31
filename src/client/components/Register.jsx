import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../supabase";
const backgroundImage = "/6.jpg";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    console.log(formData);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        setErrorMessage("Registration failed");
      } else {
        const result = await response.json();
        login(result.token, result.userId);
        navigate("/matches");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setErrorMessage("An error occurred during registration");
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
            Already have an account, Login
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
