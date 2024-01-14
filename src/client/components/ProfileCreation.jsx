import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; // Update this import path as needed

const ProfileCreation = () => {
  const { userId } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    birthdate: '',
    gender: '',
    orientation: '',
    interested_in_orientation: '',
    looking_for: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const profileData = {
      ...formData,
      user_id: userId // Add user_id from the context
    };

    try {
      console.log(userId);
      const response = await fetch('http://localhost:3000/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData)
      });

      if (!response.ok) {
        alert('Profile creation failed');
      }

      // Handle success (e.g., navigate to another page or show success message)
    } catch (error) {
      console.error('Error creating profile:', error);
    }
  };
  console.log(useContext(AuthContext));
  return (
      <div className="profile-creation">
        <form onSubmit={handleSubmit}>
          {/* Name input */}
          <label htmlFor="name">Name:</label>
          <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
          />

          {/* Birthdate input */}
          <label htmlFor="birthdate">Birthdate:</label>
          <input
              type="date"
              id="birthdate"
              name="birthdate"
              value={formData.birthdate}
              onChange={handleInputChange}
          />

          {/* Gender selection */}
          <label htmlFor="gender">Gender:</label>
          <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="non-binary">Non-binary</option>
          </select>

          {/* Orientation selection */}
          <label htmlFor="orientation">Orientation:</label>
          <select
              id="orientation"
              name="orientation"
              value={formData.orientation}
              onChange={handleInputChange}
          >
            <option value="">Select Orientation</option>
            <option value="straight">Straight</option>
            <option value="gay">Gay</option>
            <option value="bisexual">Bisexual</option>
            {/* Add other orientation options as needed */}
          </select>

          {/* Interested In Orientation selection */}
          <label htmlFor="interested_in_orientation">Interested In:</label>
          <select
              id="interested_in_orientation"
              name="interested_in_orientation"
              value={formData.interested_in_orientation}
              onChange={handleInputChange}
          >
            <option value="">Select Interested In</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="everyone">Everyone</option>
            {/* Add other options as needed */}
          </select>

          {/* Looking For input */}
          <label htmlFor="looking_for">Looking For:</label>
          <input
              type="text"
              id="looking_for"
              name="looking_for"
              value={formData.looking_for}
              onChange={handleInputChange}
          />

          <button type="submit">Create Profile
          </button>
        </form>
      </div>
  );
};
export default ProfileCreation;