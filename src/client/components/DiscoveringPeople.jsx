import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Discover = () => {
  const [randomProfile, setRandomProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { userId } = useAuth();

  useEffect(() => {
    fetchRandomProfile();
  }, []);

  const fetchRandomProfile = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/profile/random");
      if (!response.ok) {
        alert("Failed to fetch random profile");
        return;
      }
      const profile = await response.json();
      setRandomProfile(profile);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNextClick = () => {
    fetchRandomProfile();
  };

  const handleViewProfileClick = () => {
    if (randomProfile && randomProfile.profile_id) {
      navigate(`/profile/${randomProfile.profile_id}`);
    } else {
      console.error("Profile ID is missing");
    }
  };

  const Age = (birthdate) => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const handleHeartClick = async () => {
    if (!randomProfile || !userId) {
      console.log("Profile or user ID missing");
      return;
    }

    try {
      const response = await fetch("/api/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          liker_id: userId,
          liked_id: randomProfile.user_id,
        }),
      });

      if (!response.ok) {
        alert("Failed to send like");
      }

      console.log("Like sent successfully");
    } catch (error) {
      console.error("Error sending like:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!randomProfile) {
    return <div>No profiles available.</div>;
  }

  return (
    <div
      style={{ backgroundColor: "#1F2937", maxWidth: "900px" }}
      className="p-5 rounded-lg mx-auto my-8 shadow-md border-4 border-red-600"
    >
      <div className="flex justify-center items-center h-full">
        <img
          src={randomProfile.picture_url}
          alt="Profile"
          style={{ width: "600px", height: "600px", objectFit: "cover" }}
          className="rounded-lg"
        />
      </div>
      <h2 className=" text-2xl font-semibold text-white">
        {randomProfile.name}
      </h2>
      <p className="text-white text-3xl">Age: {Age(randomProfile.birthdate)}</p>

      <div className="w-full max-w-3xl flex justify-center space-x-4 mt-4 ">
        <button
          className="bg-red-600  text-white p-2 rounded-md transition duration-300 hover:bg-purple-500"
          onClick={handleNextClick}
        >
          Next
        </button>
        <button
          className="bg-red-600 text-white p-2 rounded-md transition duration-300 hover:bg-purple-500"
          onClick={handleViewProfileClick}
        >
          View Profile
        </button>
        <button
          className="heart-button bg-red-600 text-white p-3 rounded-md cursor-pointer text-lg transition duration-300 hover:bg-purple-600 "
          onClick={handleHeartClick}
        >
          Like
          <span className="top-part"></span>
          <span className="bottom-part"></span>
        </button>
      </div>
    </div>
  );
};

export default Discover;
