import React, { useState } from "react";
import "../styles/ProfileCreation.css";

function ProfileCreation() {
  // State to hold form data
  const [formData, setFormData] = useState({
    name: '',
    birthdate: '',
    gender: '',
    orientation: '',
    interestedInOrientation: '',
    height: 60,
    bodyType: '',
    ethnicity: '',
    bio: '',
    hobbies: [],
    ageRangePreference: { min: 18, max: 100 },
    privacySettings: { showProfile: false, shareData: false },
    notificationSettings: { emailNotifications: false, smsNotifications: false }
  });

  // Handle input changes for all form fields
  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === "checkbox") {
      if (name === "hobbies") {
        // Handle hobbies selection
        setFormData(prevFormData => ({
          ...prevFormData,
          hobbies: checked
              ? [...prevFormData.hobbies, value]
              : prevFormData.hobbies.filter(hobby => hobby !== value)
        }));
      } else {
        // Handle other checkboxes
        setFormData(prevFormData => ({
          ...prevFormData,
          [name]: checked
        }));
      }
    } else {
      // Handle other inputs
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: value
      }));
    }
  };

  // Function to submit the form data
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Convert formData to the format the backend expects
    const convertedFormData = {
      ...formData,
      height: `${Math.floor(formData.height / 12)}'${formData.height % 12}"`,
      ageRangePreference: `${formData.ageRangePreference.min}-${formData.ageRangePreference.max}`,
      privacySettings: JSON.stringify(formData.privacySettings),
      notificationSettings: JSON.stringify(formData.notificationSettings),
      hobbies: formData.hobbies.join(', ') // Convert hobbies array to string
    };

    try {
      // POST request to backend's '/profile' endpoint
      const response = await fetch('http://localhost:3000/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(convertedFormData)
      });

      if (!response.ok) {
        console.error('Profile creation failed');
      }

      // Handle success (e.g., navigate to another page or show success message)
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
            <option value="female">
              Female</option>
            <option value="non-binary">Non-binary</option>
          </select>

          php
          Copy code
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
            <option value="asexual">Asexual</option>
            <option value="pansexual">Pansexual</option>
            <option value="queer">Queer</option>
            <option value="preferNotToDisclose">Prefer not to disclose</option>
          </select>

          {/* Interested In Orientation selection */}
          <label htmlFor="interestedInOrientation">Interested In:</label>
          <select
              id="interestedInOrientation"
              name="interestedInOrientation"
              value={formData.interestedInOrientation}
              onChange={handleInputChange}
          >
            <option value="">Select Interested In</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="everyone">Everyone</option>
          </select>

          {/* Height input */}
          <label htmlFor="height">Height:</label>
          <input
              type="range"
              id="height"
              name="height"
              min="48"
              max="96"
              value={formData.height}
              onChange={handleInputChange}
          />
          <span>{Math.floor(formData.height / 12)}' {formData.height % 12}"</span>

          {/* Body Type selection */}
          <label htmlFor="bodyType">Body Type:</label>
          <select
              id="bodyType"
              name="bodyType"
              value={formData.bodyType}
              onChange={handleInputChange}
          >
            <option value="">Select Body Type</option>
            <option value="thin">Thin</option>
            <option value="average">Average</option>
            <option value="athletic">Athletic</option>
            <option value="curvy">Curvy</option>
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
            <option value="AmericanIndian">American Indian or Alaska Native</option>
            <option value="Asian">Asian</option>
            <option value="Black">Black or African American</option>
            <option value="Hispanic">Hispanic or Latino</option>
            <option value="White">White</option>
            <option value="Other">Other</option>
          </select>

          {/* Bio input */}
          <label htmlFor="bio">About Me:</label>
          <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
          />

          {/* Hobbies checkboxes */}
          {/* Add checkboxes for hobbies here. Repeat the pattern for each hobby. */}
          <div className="hobbies-section">
            <h3>Hobbies:</h3>
            {/* Example hobby */}
            <label>
              <input
                  type="checkbox"
                  name="hobbies"
                  value="Reading"
                  checked={formData.hobbies.includes("Reading")}
                  onChange={handleInputChange}
              />
              Reading
            </label>
            {/* Add other hobbies here */}
          </div>

          {/* Age Range Preference input */}
          <label htmlFor="age-range-min">Minimum Age Preference: {formData.ageRangePreference.min}</label>
          <input
              type="range"
              id="age-range-min"
              name="age-range-min"
              min="18"
              max="100"
              value={formData.ageRangePreference.min}
              onChange={(e) => setFormData({ ...formData, ageRangePreference: { ...formData.ageRangePreference, min: e.target.value }})}
          />

          <label htmlFor="age-range-max">Maximum Age Preference: {formData.ageRangePreference.max
          }</label>
          <input
              type="range"
              id="age-range-max"
              name="age-range-max"
              min="18"
              max="100"
              value={formData.ageRangePreference.max}
              onChange={(e) => setFormData({ ...formData, ageRangePreference: { ...formData.ageRangePreference, max: e.target.value }})}
          />

          php
          Copy code
          {/* Privacy Settings */}
          <div className="privacy-settings">
            <h3>Privacy Settings</h3>
            <label htmlFor="showProfile">
              Show my profile to everyone
              <input
                  type="checkbox"
                  id="showProfile"
                  name="privacySettings.showProfile"
                  checked={formData.privacySettings.showProfile}
                  onChange={handleInputChange}
              />
            </label>
            <label htmlFor="shareData">
              Share my data for research purposes
              <input
                  type="checkbox"
                  id="shareData"
                  name="privacySettings.shareData"
                  checked={formData.privacySettings.shareData}
                  onChange={handleInputChange}
              />
            </label>
          </div>

          {/* Notification Settings */}
          <div className="notification-settings">
            <h3>Notification Settings</h3>
            <label htmlFor="emailNotifications">
              Email Notifications
              <input
                  type="checkbox"
                  id="emailNotifications"
                  name="notificationSettings.emailNotifications"
                  checked={formData.notificationSettings.emailNotifications}
                  onChange={handleInputChange}
              />
            </label>
            <label htmlFor="smsNotifications">
              SMS Notifications
              <input
                  type="checkbox"
                  id="smsNotifications"
                  name="notificationSettings.smsNotifications"
                  checked={formData.notificationSettings.smsNotifications}
                  onChange={handleInputChange}
              />
            </label>
          </div>

          {/* Submit button */}
          <input type="submit" value="Submit" />
        </form>
      </div>
  );
}

export default ProfileCreation;