import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Matches = () => {
  const [likes, setLikes] = useState([]);
  const { userId } = useAuth();
  const [suggestions, setSuggestions] = useState([]);

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
                {like.likerPicture ? (
                  <img
                    src={like.likerPicture}
                    alt={like.likerName}
                    className="w-24 h-24 mr-4"
                  />
                ) : (
                  <div className="w-24 h-24 bg-gray-200 mr-4 flex items-center justify-center">
                    No image
                  </div>
                )}
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
        <h2 className="text-2xl font-bold text-white">Suggested Matches</h2>
        <ul>
          {suggestions.map((suggestion, index) => (
            <li key={index} className="my-4">
              <div className="p-5 rounded-lg shadow-md border border-red-600">
                <div>Name: {suggestion.name}</div>
                <div>Orientation: {suggestion.orientation}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Matches;
