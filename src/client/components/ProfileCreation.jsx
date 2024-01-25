import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import UploadWidget from "./UploadWidget";
const ProfileCreation = () => {
  const { userId, setProfile, profileId } = useContext(AuthContext);
  const navigate = useNavigate();

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

  // Function to handle setting the public ID from Cloudinary
  const handleSetPublicId = (publicId) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      picture_url: `https://res.cloudinary.com/dtnm1xt5q/image/upload/${publicId}`, // Construct the full URL using the publicId
    }));
  };

  // Cloudinary widget configuration
  const uwConfig = {
    cloudName: "dtnm1xt5q",
    uploadPreset: "puckerup",
    folder: "puckerup",
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value || "",
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const profileData = {
      ...formData,
      height_ft: parseInt(formData.height_ft, 10), // Convert to integer
      height_in: parseInt(formData.height_in, 10), // Convert to integer
      user_id: userId,
    };

    try {
      const response = await fetch("http://localhost:3000/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileData),
      });

      const data = await response.json();

      if (!response.ok) {
        alert("Profile creation failed");
      } else {
        setProfile(data["profile_id"]);
        navigate("/profile");
      }
    } catch (error) {
      console.error("Error creating profile:", error);
    }
  };

  return (
    <div className="bg-white p-5 rounded-lg max-w-lg mx-auto my-8 shadow-md border border-red-600">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Name input */}
        <div>
          <label
            htmlFor="picture_url"
            className="block mb-2 font-bold text-red-600"
          >
            Profile Picture:
          </label>
          {/* Cloudinary Upload Widget */}
          <UploadWidget uwConfig={uwConfig} setPublicId={handleSetPublicId} />

          <label htmlFor="name" className="block mb-2 font-bold text-red-600">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-3 rounded-md border border-gray-300 text-lg"
          />
        </div>

        {/* Birthdate input */}
        <div>
          <label
            htmlFor="birthdate"
            className="block mb-2 font-bold text-red-600"
          >
            Birthdate:
          </label>
          <input
            type="date"
            id="birthdate"
            name="birthdate"
            value={formData.birthdate}
            onChange={handleInputChange}
            className="w-full p-3 rounded-md border border-gray-300 text-lg"
          />
        </div>

        {/* Gender selection */}
        <div>
          <label htmlFor="gender" className="block mb-2 font-bold text-red-600">
            Gender:
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="w-full p-3 rounded-md border border-gray-300 text-lg"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="non-binary">Non-binary</option>
          </select>
        </div>

        {/* Orientation selection */}
        <div>
          <label
            htmlFor="orientation"
            className="block mb-2 font-bold text-red-600"
          >
            Orientation:
          </label>
          <select
            id="orientation"
            name="orientation"
            value={formData.orientation}
            onChange={handleInputChange}
            className="w-full p-3 rounded-md border border-gray-300 text-lg"
          >
            <option value="">Select Orientation</option>
            <option value="straight">Straight</option>
            <option value="gay">Gay</option>
            <option value="bisexual">Bisexual</option>
            {/* Add other orientation options as needed */}
          </select>
        </div>

        {/* Height input */}
        <div>
          <label className="block mb-2 font-bold text-red-600">Height:</label>
          <div className="grid grid-cols-4 gap-2 items-center">
            <input
              type="number"
              id="height_ft"
              name="height_ft"
              value={formData.height_ft}
              onChange={handleInputChange}
              className="w-full p-2 rounded-md border border-gray-300 text-lg"
            />
            <span>ft</span>
            <input
              type="number"
              id="height_in"
              name="height_in"
              value={formData.height_in}
              onChange={handleInputChange}
              className="w-full p-2 rounded-md border border-gray-300 text-lg"
            />
            <span>in</span>
          </div>
        </div>

        {/* Body Type selection */}
        <div>
          <label
            htmlFor="body_type"
            className="block mb-2 font-bold text-red-600"
          >
            Body Type:
          </label>
          <select
            id="body_type"
            name="body_type"
            value={formData.body_type}
            onChange={handleInputChange}
            className="w-full p-3 rounded-md border border-gray-300 text-lg"
          >
            <option value="">Select Body Type</option>
            <option value="slim">Slim</option>
            <option value="athletic">Athletic</option>
            <option value="average">Average</option>
            <option value="curvy">Curvy</option>
            <option value="muscular">Muscular</option>
            <option value="full_figured">Full Figured</option>
            {/* Add other body type options as needed */}
          </select>
        </div>

        {/* Ethnicity selection */}
        <div>
          <label
            htmlFor="ethnicity"
            className="block mb-2 font-bold text-red-600"
          >
            Ethnicity:
          </label>
          <select
            id="ethnicity"
            name="ethnicity"
            value={formData.ethnicity}
            onChange={handleInputChange}
            className="w-full p-3 rounded-md border border-gray-300 text-lg"
          >
            <option value="">Select Ethnicity</option>
            <option value="asian">Asian</option>
            <option value="black">Black</option>
            <option value="latino">Latino</option>
            <option value="white">White</option>
            <option value="mixed">Mixed</option>
            {/* Add other ethnicity options as needed */}
          </select>
        </div>

        {/* Smokes selection */}
        <div>
          <label htmlFor="smokes" className="block mb-2 font-bold text-red-600">
            Smokes:
          </label>
          <select
            id="smokes"
            name="smokes"
            value={formData.smokes}
            onChange={handleInputChange}
            className="w-full p-3 rounded-md border border-gray-300 text-lg"
          >
            <option value="">Select Option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        {/* Drinks selection */}
        <div>
          <label htmlFor="drinks" className="block mb-2 font-bold text-red-600">
            Drinks:
          </label>
          <select
            id="drinks"
            name="drinks"
            value={formData.drinks}
            onChange={handleInputChange}
            className="w-full p-3 rounded-md border border-gray-300 text-lg"
          >
            <option value="">Select Option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        {/* Hometown input */}
        <div>
          <label
            htmlFor="hometown"
            className="block mb-2 font-bold text-red-600"
          >
            Hometown:
          </label>
          <input
            type="text"
            id="hometown"
            name="hometown"
            value={formData.hometown}
            onChange={handleInputChange}
            className="w-full p-3 rounded-md border border-gray-300 text-lg"
          />
        </div>

        {/* Current Location input */}
        <div>
          <label
            htmlFor="current_location"
            className="block mb-2 font-bold text-red-600"
          >
            Current Location:
          </label>
          <input
            type="text"
            id="current_location"
            name="current_location"
            value={formData.current_location}
            onChange={handleInputChange}
            className="w-full p-3 rounded-md border border-gray-300 text-lg"
          />
        </div>

        {/* Looking For selection */}
        <div>
          <label
            htmlFor="looking_for"
            className="block mb-2 font-bold text-red-600"
          >
            Looking For:
          </label>
          <select
            id="looking_for"
            name="looking_for"
            value={formData.looking_for}
            onChange={handleInputChange}
            className="w-full p-3 rounded-md border border-gray-300 text-lg"
          >
            <option value="">Select What You're Looking For</option>
            <option value="friendship">Friendship</option>
            <option value="dating">Dating</option>
            <option value="long_term_relationship">
              Long-Term Relationship
            </option>
            <option value="casual_encounters">Casual Encounters</option>
            {/* Add other looking for options as needed */}
          </select>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="bg-red-600 text-white p-3 rounded-md cursor-pointer text-lg transition duration-300 hover:bg-purple-500"
        >
          Create Profile
        </button>
      </form>
    </div>
  );
};

export default ProfileCreation;
