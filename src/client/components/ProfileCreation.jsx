import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import '../styles/ProfileCreation.css';
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

          {/* Height selection */}
          <label>Height:</label>
          <div className="height-inputs">
            <input
                type="number"
                id="height_ft"
                name="height_ft"
                value={formData.height_ft}
                onChange={handleInputChange}
            />
            <span>ft</span>
            <input
                type="number"
                id="height_in"
                name="height_in"
                value={formData.height_in}
                onChange={handleInputChange}
            />
            <span>in</span>
          </div>

          {/* Body Type selection */}
          <label htmlFor="body_type">Body Type:</label>
          <select
              id="body_type"
              name="body_type"
              value={formData.body_type}
              onChange={handleInputChange}
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

          {/* Ethnicity selection */}
          <label htmlFor="ethnicity">Ethnicity:</label>
          <select
              id="ethnicity"
              name="ethnicity"
              value={formData.ethnicity}
              onChange={handleInputChange}
          >
            <option value="">Select Ethnicity</option>
            <option value="asian">Asian</option>
            <option value="black">Black</option>
            <option value="latino">Latino</option>
            <option value="white">White</option>
            <option value="mixed">Mixed</option>
            {/* Add other ethnicity options as needed */}
          </select>

          {/* Smokes selection */}
          <label htmlFor="smokes">Smokes:</label>
          <select
              id="smokes"
              name="smokes"
              value={formData.smokes}
              onChange={handleInputChange}
          >
            <option value="">Select Option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>

          {/* Drinks selection */}
          <label htmlFor="drinks">Drinks:</label>
          <select
              id="drinks"
              name="drinks"
              value={formData.drinks}
              onChange={handleInputChange}
          >
            <option value="">Select Option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>

          {/* Hometown input */}
          <label htmlFor="hometown">Hometown:</label>
          <input
              type="text"
              id="hometown"
              name="hometown"
              value={formData.hometown}
              onChange={handleInputChange}
          />

          {/* Current Location input */}
          <label htmlFor="current_location">Current Location:</label>
          <input
              type="text"
              id="current_location"
              name="current_location"
              value={formData.current_location}
              onChange={handleInputChange}
          />

          {/* Looking For selection */}
          <label htmlFor="looking_for">Looking For:</label>
          <select
              id="looking_for"
              name="looking_for"
              value={formData.looking_for}
              onChange={handleInputChange}
          >
            <option value="">Select What You're Looking For</option>
            <option value="friendship">Friendship</option>
            <option value="dating">Dating</option>
            <option value="long_term_relationship">Long-Term Relationship</option>
            <option value="casual_encounters">Casual Encounters</option>
            {/* Add other looking for options as needed */}
          </select>

          <button type="submit">Create Profile</button>
        </form>
      </div>
  );
};

export default ProfileCreation;
