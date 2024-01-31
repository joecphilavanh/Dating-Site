import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
const noImage = "/noImage.jpg";

const Matches = () => {
  const [likes, setLikes] = useState([]);
  const { userId } = useAuth();
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const calculateAge = (birthdate) => {
    const birthday = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birthday.getFullYear();
    const m = today.getMonth() - birthday.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
      age--;
    }
    return age;
  };

  const handleViewProfileClick = (profileId) => {
    if (profileId) {
      navigate(`/profile/${profileId}`);
    } else {
      console.error("Profile ID is missing");
    }
  };

  const handleUnlike = async (likeId) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`/api/like/${likeId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      setLikes(likes.filter((like) => like.like_id !== likeId));
    }
  };

  useEffect(() => {
    const fetchLikes = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/like/liked/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setLikes(data);
      }
    };

    const fetchSuggestions = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/suggestions/matchMaking/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setSuggestions(data);
      }
    };

    if (userId) {
      fetchLikes();
      fetchSuggestions();
    }
  }, [userId]);

  return (
    <div>
      <div
        style={{ backgroundColor: "#1F2937", maxWidth: "900px" }}
        className="bg-white p-5 rounded-lg max-w-lg mx-auto my-8 shadow-md border border-red-600"
      >
        <h2 className="text-2xl font-bold text-white font-sans">Matches</h2>
        <ul>
          {likes.map((like) => (
            <li key={like.like_id} className="my-4">
              <div className="bg-white p-5 rounded-lg shadow-md border border-red-600 flex items-center justify-between">
                <div className="flex items-center">
                  <Link to={`/profile/${like.user_id}`}>
                    <img
                      onClick={() => handleViewProfileClick(like.user_id)}
                      src={like.likerPicture || noImage}
                      alt={like.likerName}
                      className="w-24 h-24 mr-4 cursor-pointer hover:opacity-80"
                    />
                  </Link>
                  <div>
                    <div className="text-lg font-bold">{like.likerName}</div>
                    <div>Age: {calculateAge(like.likerbirthdate)}</div>
                    <div>Orientation: {like.likerorientation}</div>
                    <div>Looking for: {like.likerlooking_for}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Link
                    to={`/send-message/${like.user_id}`}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mr-4"
                  >
                    Send Message
                  </Link>
                  <button
                    onClick={() => handleUnlike(like.like_id)}
                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
                  >
                    Unlike
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div>
          <div
            style={{ backgroundColor: "#1F2937", maxWidth: "900px" }}
            className="bg-white p-5 rounded-lg max-w-lg mx-auto my-8 shadow-md border border-red-600"
          >
            <h2 className="text-2xl font-bold text-white">Suggested Matches</h2>
            <div className="grid grid-cols-4 gap-4">
              {suggestions.map((suggestion, index) => (
                <div key={index} className="w-1/2 md:w-1/3 lg:w-1/4 p-2">
                  <div
                    onClick={() =>
                      handleViewProfileClick(suggestion.profile_id)
                    }
                    className="cursor-pointer hover:opacity-80"
                  >
                    <div className="p-5 bg-white rounded-lg shadow-md border border-red-600">
                      <img
                        src={suggestion.picture_url || noImage}
                        alt={suggestion.name}
                        className="w-24 h-24 mr-4"
                      />
                      <div>Name: {suggestion.name}</div>
                      <div>Age: {calculateAge(suggestion.birthdate)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Matches;
