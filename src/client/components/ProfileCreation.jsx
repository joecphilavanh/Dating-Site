import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
const ProfileCreation = () => {
  const { userId } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    birthdate: '',
    gender: '',
    orientation: '',
    height_ft: '0',
    height_in: '0',
    body_type: '',
    ethnicity: '',
    smokes: '', // Dropdown option
    drinks: '', // Dropdown option
    profession: '',
    hometown: '',
    current_location: '',
    looking_for: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
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
      const response = await fetch('http://localhost:3000/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        alert('Profile creation failed');
      } else {
        navigate('/profile');
      }
    } catch (error) {
      console.error('Error creating profile:', error);
    }
  };

  return (
      <div className="bg-white p-5 rounded-lg max-w-lg mx-auto my-8 shadow-md border border-red-600">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Name input */}
          <div>
            <label htmlFor="name" className="block mb-2 font-bold text-red-600">Name:</label>
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
            <label htmlFor="birthdate" className="block mb-2 font-bold text-red-600">Birthdate:</label>
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
            <label htmlFor="gender" className="block mb-2 font-bold text-red-600">Gender:</label>
            <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full p-3 rounded-md border border-gray-300 text-lg"
            >
              {/* Gender options */}
            </select>
          </div>

          {/* Orientation selection */}
          <div>
            <label htmlFor="orientation" className="block mb-2 font-bold text-red-600">Orientation:</label>
            <select
                id="orientation"
                name="orientation"
                value={formData.orientation}
                onChange={handleInputChange}
                className="w-full p-3 rounded-md border border-gray-300 text-lg"
            >
              {/* Orientation options */}
            </select>
          </div>

          {/* Height selection */}
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
            <label htmlFor="body_type" className="block mb-2 font-bold text-red-600">Body Type:</label>
            <select
                id="body_type"
                name="body_type"
                value={formData.body_type}
                onChange={handleInputChange}
                className="w-full p-3 rounded-md border border-gray-300 text-lg"
            >
              {/* Body type options */}
            </select>
          </div>

          {/* Ethnicity selection */}
          <div>
            <label htmlFor="ethnicity" className="block mb-2 font-bold text-red-600">Ethnicity:</label>
            <select
                id="ethnicity"
                name="ethnicity"
                value={formData.ethnicity}
                onChange={handleInputChange}
                className="w-full p-3 rounded-md border border-gray-300 text-lg"
            >
              {/* Ethnicity options */}
            </select>
          </div>

          {/* Smokes selection */}
          <div>
            <label htmlFor="smokes" className="block mb-2 font-bold text-red-600">Smokes:</label>
            <select
                id="smokes"
                name="smokes"
                value={formData.smokes}
                onChange={handleInputChange}
                className="w-full p-3 rounded-md border border-gray-300 text-lg"
            >
              {/* Smoking options */}
            </select>
          </div>

          {/* Drinks selection */}
          <div>
            <label htmlFor="drinks" className="block mb-2 font-bold text-red-600">Drinks:</label>
            <select
                id="drinks"
                name="drinks"
                value={formData.drinks}
                onChange={handleInputChange}
                className="w-full p-3 rounded-md border border-gray-300 text-lg"
            >
              {/* Drinking options */}
            </select>
          </div>

          {/* Hometown input */}
          <div>
            <label htmlFor="hometown" className="block mb-2 font-bold text-red-600">Hometown:</label>
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
            <label htmlFor="current_location" className="block mb-2 font-bold text-red-600">Current Location:</label>
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
            <label htmlFor="looking_for" className="block mb-2 font-bold text-red-600">Looking For:</label>
            <select
                id="looking_for"
                name="looking_for"
                value={formData.looking_for}
                onChange={handleInputChange}
                className="w-full p-3 rounded-md border border-gray-300 text-lg"
            >
              {/* Looking for options */}
            </select>
          </div>

          <button type="submit" className="bg-red-600 text-white p-3 rounded-md cursor-pointer text-lg transition duration-300 hover:bg-purple-500">
            Create Profile
          </button>
        </form>
      </div>
  );
};

export default ProfileCreation;
