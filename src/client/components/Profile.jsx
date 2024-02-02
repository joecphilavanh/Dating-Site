import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import viewsIcon from "/views.jpg";
import matchesIcon from "/matches.png";
import cloudIcon from "/cloud.png";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { userId, isLoggedIn, profileId, token } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    birthdate: "",
    gender: "",
    orientation: "",
    height_ft: "",
    height_in: "",
    body_type: "",
    ethnicity: "",
    smokes: "",
    drinks: "",
    profession: "",
    hometown: "",
    current_location: "",
    looking_for: "",
    age_range_preference: "",
    picture_url: "",
    bio: "",
  });
  const [temperature, setTemperature] = useState(null);
  const calculateAge = (birthdate) => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };
  useEffect(() => {
    const fetchProfileData = async () => {
      if (isLoggedIn) {
        const response = await fetch(`/api/profile/${profileId}`);
        if (response.ok) {
          const data = await response.json();
          setFormData(data);
        } else {
          alert("Profile not found.");
        }
      }
      const lat = "36.1716";
      const lon = "-115.1391";
      const apiKey = "5ef017b9b9e376efe20d43467b8b1948";
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data && data.main && typeof data.main.temp !== "undefined") {
        setTemperature(data.main.temp);
      }
    };

    fetchProfileData();
  }, [userId, isLoggedIn, profileId]);
  const navigate = useNavigate();
  const navigateToEditPage = () => {
    navigate(`/editprofile`);
  };

  return (
    <div className="wrapper">
      <div className="profile">
        <div className="profile_img_info">
          <div className="img">
            <img src={formData.picture_url} alt="Profile Picture" />
          </div>
          <div className="info">
            <div className="name">{formData.name}</div>
            <div className="profession">{formData.profession}</div>
          </div>
        </div>
        <div className="profile_skills">
          <div className="skills">
            <p>Bio</p>
            <p>{formData.bio}</p>
          </div>
          <div className="tags_wrap">
            <span className="tag">Age: {calculateAge(formData.birthdate)}</span>
            <span className="tag">Gender: {formData.gender}</span>
            <span className="tag">Orientation: {formData.orientation}</span>
            <span className="tag">
              Height: {`${formData.height_ft}' ${formData.height_in}"`}
            </span>
            <span className="tag">Body Type: {formData.body_type}</span>
            <span className="tag">Ethnicity: {formData.ethnicity}</span>
            <span className="tag">Smokes: {formData.smokes}</span>
            <span className="tag">Drinks: {formData.drinks}</span>
            <span className="tag">
              Current Location: {formData.current_location}
            </span>
            <span className="tag">Hometown: {formData.hometown}</span>
            <span className="tag">Looking For: {formData.looking_for}</span>
            <span className="tag">
              Age Range Preference: {formData.age_range_preference}
            </span>
          </div>
        </div>
      </div>
      <div className="right-container">
        <img src={cloudIcon} alt="Cloud Icon" />
        <div className="title text-center font-bold">Current Temperature: </div>
        <div className="title text-center">
          {temperature !== null ? `${temperature}°F` : "Loading..."}
        </div>
        <img src={matchesIcon} alt="Matches Icon" />
        <div className="title text-center font-bold">Matches</div>
        <div className="title text-center">95</div>
        <hr />
        <img src={viewsIcon} alt="Views Icon" />
        <div className="title text-center font-bold">Views</div>
        <div className="title text-center">235</div>
        <button
          className="bg-red-600 text-white p-2 rounded-md transition duration-300 hover:bg-red-700 center-button"
          onClick={navigateToEditPage}
        >
          Edit Profile
        </button>

        <hr />
      </div>
    </div>
  );
};

export default Profile;
