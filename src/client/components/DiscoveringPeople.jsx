import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Discover = () => {
  const [randomProfile, setRandomProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [like, setLike] = useState(null);
  const navigate = useNavigate();
  const { userId } = useAuth();
  // const isFirstRender = useRef(true);

  useEffect(() => {
    if (userId) {
      fetchRandomProfile();
    }
  }, [userId]);

  const fetchRandomProfile = async () => {
    try {
      setLoading(true);
      setLike(false);
      const response = await fetch("/api/profile/random");

      if (!response.ok) {
        alert("Failed to fetch random profile");
        return;
      }
      const profile = await response.json();
      setRandomProfile(profile);
      fetchLiked(profile.user_id);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLiked = async (profileId) => {
    try {
      const response = await fetch(`/api/like/liker/${userId}`);
      if (!response.ok) {
        return;
      }

      const allLiked = await response.json();
      searchIfLiked(profileId, allLiked);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const searchIfLiked = (profileId, likedArray) => {
    likedArray.forEach((element) => {
      if (profileId === element.liked_id) {
        setLike(true);
      }
    });
  };

  const removeUserFromPool = (userId) => {};

  const handleNextClick = () => {
    fetchRandomProfile();
    setRandomProfile(null);
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

      if (response.ok) {
        setLike(true);
      } else {
        alert("Failed to send like");
      }
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
          className="bg-red-600  text-white p-2 rounded-md transition duration-300 hover:bg-red-700"
          onClick={handleNextClick}
        >
          Next
        </button>
        <button
          className="bg-red-600 text-white p-2 rounded-md transition duration-300 hover:bg-red-700"
          onClick={handleViewProfileClick}
        >
          View Profile
        </button>
        {like ? (
          <button
            className="bg-red-600 text-white p-3 rounded-md cursor-pointer text-lg transition duration-300 hover:bg-purple-600 "
            // onClick={handleHeartClick}
          >
            <span>✅</span>
            <span className="top-part"></span>
            <span className="bottom-part"></span>
          </button>
        ) : (
          <button
            className="heart-button bg-red-600 text-white p-3 rounded-md cursor-pointer text-lg transition duration-300 hover:bg-purple-600 "
            onClick={handleHeartClick}
          >
            Like
            <span className="top-part"></span>
            <span className="bottom-part"></span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Discover;
