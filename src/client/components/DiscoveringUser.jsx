import React, { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { useNavigate } from 'react-router-dom'; 

const FetchProfiles = () => {
  const [profiles, setProfiles] = useState([]);
  const [error, setError] = useState(null);
  const [currentPic, setCurrentPic] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const { data, error } = await supabase
          .from("Profiles")
          .select("picture_url, name, birthdate, gender, orientation, body_type, ethnicity, looking_for, age_range_preference, drinks, height_ft, height_in, profession, smokes");

        if (error) {
          console.log("Error fetching data: " + error.message);
        } else {
          setProfiles(data);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchProfiles();
  }, []);

  const Age = (birthdate) => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleNext = () => {
    setCurrentPic((prevPic) => (prevPic + 1) % profiles.length);
  };

  const handleBack = () => {
    setCurrentPic(
      (prevPic) => (prevPic - 1 + profiles.length) % profiles.length
    );
  };
  
  const handleLikeClick = () => {
    const userId = profiles[currentPic].id;
    navigate(`/UserProfile/${userId}`);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
    <div className="flex flex-col items-center w-full">
      {profiles.length > 0 && (
        <div className="rounded-lg max-w-4xl w-64 h-64 shadow-md border border-red-600 flex overflow-hidden">
      <div className="w-1/2 h-full flex justify-center items-center">
        <img
          src={profiles[currentPic].picture_url}
          alt={`Profile ${currentPic + 1}`}
          className="max-w-full max-h-full object-contain"
        />
      </div>
      <div className="w-1/2 p-4 overflow-y-auto">
            <p>Name: {profiles[currentPic].name}</p>
            <p>Name: {profiles[currentPic].name}</p>
            <p>Name: {profiles[currentPic].name}</p>
            <p>Name: {profiles[currentPic].name}</p>
            <p>Name: {profiles[currentPic].name}</p>
            <p>Name: {profiles[currentPic].name}</p>
            <p>Name: {profiles[currentPic].name}</p>
            <p>Name: {profiles[currentPic].name}</p>
            <p>Name: {profiles[currentPic].name}</p>
            <p>Name: {profiles[currentPic].name}</p>
            <p>Name: {profiles[currentPic].name}</p>

            <p>Birthdate: {profiles[currentPic].birthdate}</p>
            <p>Gender: {profiles[currentPic].gender}</p>
            <p>Orientation: {profiles[currentPic].orientation}</p>
            <p>Body Type: {profiles[currentPic].body_type}</p>
            <p>Ethnicity: {profiles[currentPic].ethnicity}</p>
            <p>Looking For: {profiles[currentPic].looking_for}</p>
            <p>Age Range Preference: {profiles[currentPic].age_range_preference}</p>
            <p>Drinks: {profiles[currentPic].drinks}</p>
            <p>Height: {profiles[currentPic].height_ft}' {profiles[currentPic].height_in}"</p>
            <p>Profession: {profiles[currentPic].profession}</p>
            <p>Smokes: {profiles[currentPic].smokes}</p>
          </div>
        </div>
      )}

      <div className="mt-4 flex justify-center space-x-4">
        <button
          className="arrow-button back-arrow"
          onClick={handleBack}
          aria-label="Back"
        ></button>
        <button
          className="arrow-button next-arrow"
          onClick={handleNext}
          aria-label="Next"
        ></button>
        <button
          className="heart-button bg-red-600 text-white p-3 rounded-md cursor-pointer text-lg transition duration-300 "
          onClick={handleLikeClick}
        >
          Like
          <span className="top-part"></span>
          <span className="bottom-part"></span>
        </button>
        </div>
        </div>
      </div>
      
  );
};

export default FetchProfiles;
