import React, { useState } from "react";

import "../styles/ProfileCreation.css";

function ProfileCreation() {
  const [inputValue, setInputValue] = React.useState("");
  const [minAge, setMinAge] = useState(18);
  const [maxAge, setMaxAge] = useState(100);
  const [height, setHeight] = useState(60);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="profile-creation">
      <div className="media-upload">
        <h2>Add Videos or Images</h2>
         {/*Once images get in have it display images here maybe scrolling style so it doesnt 
take up to much space*/}
        <input type="file" multiple />
      </div>

      <div className="info-form">
        <h2>Personal Information</h2>
        <form>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" />

          <label htmlFor="birthdate">Birthdate:</label>
          <input type="date" id="birthdate" name="birthdate" />

          <label htmlFor="gender">Gender:</label>
          <select id="gender" name="gender" onChange={handleInputChange}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="non-binary">Non-binary</option>
          </select>

          <label htmlFor="orientation">Orientation:</label>
          <select
            id="orientation"
            name="orientation"
            onChange={handleInputChange}
          >
            <option value="">Select Orientation</option>
            <option value="straight">Straight</option>
            <option value="gay">Gay</option>
            <option value="pansexual">Pansexual</option>
            <option value="asexual">Asexual</option>
            <option value="demisexual">Demisexual</option>
            <option value="bisexual">Bisexual</option>
            <option value="lesbian">Lesbian</option>
            <option value="queer">Queer</option>
            <option value="preferNotToDisclose">Prefer not to disclose</option>
          </select>

          <label htmlFor="interestedIn">Interested In:</label>
          <select
            id="interestedIn"
            name="interestedIn"
            onChange={handleInputChange}
          >
            <option value="">Select Interested In</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="everyone">Everyone</option>
          </select>

          <label htmlFor="height">Height:</label>
          <input
            type="range"
            id="height"
            name="height"
            min="48"
            max="96"
            step="1"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
          <span>
            {Math.floor(height / 12)}' {height % 12}"
          </span>

          <label htmlFor="bodyType">Body Type:</label>
          <select id="bodyType" name="bodyType" onChange={handleInputChange}>
            <option value="">Select Body</option>
            <option value="Thin">Thin</option>
            <option value="Average">Average</option>
            <option value="curvy">Curvy</option>
            <option value="MoreToLove">More to Love</option>
          </select>

          <label htmlFor="ethnicity">Ethnicity:</label>
          <select id="ethnicity" name="ethnicity" onChange={handleInputChange}>
            <option value="">Select Ethnicity</option>
            <option value="AmericanIndian">
              American Indian or Alaskan Native
            </option>
            <option value="Asian">Asian / Pacific Islander</option>
            <option value="African">Black or African American</option>
            <option value="Hispanic">Hispanic</option>
            <option value="Caucasian">White / Caucasian</option>
            <option value="multiple">Multiple ethnicity</option>
          </select>

          <label htmlFor="bio">About Me:</label>
          <textarea id="bio" name="bio" />

          <div className="lifestyle-preferences">
            <h3>Hobbies:</h3>
            <div className="checkbox-grid">
              <label>
                <input type="checkbox" name="Outdoor" /> Outdoor Activities
              </label>
              <label>
                <input type="checkbox" name="Reading" /> Reading
              </label>
              <label>
                <input type="checkbox" name="Traveling" /> Traveling
              </label>
              <label>
                <input type="checkbox" name="Drinking" /> Drinking
              </label>
              <label>
                <input type="checkbox" name="FitnessGym" /> Fitness/Gym
              </label>
              <label>
                <input type="checkbox" name="420" /> Smoking/420
              </label>
              <label>
                <input type="checkbox" name="Cooking" /> Cooking
              </label>
              <label>
                <input type="checkbox" name="Reading" /> Reading
              </label>
              <label>
                <input type="checkbox" name="Yoga" /> Yoga
              </label>
              <label>
                <input type="checkbox" name="BoardGames" /> Board Games
              </label>
              <label>
                <input type="checkbox" name="Cycling" /> Cycling
              </label>
              <label>
                <input type="checkbox" name="Writing" /> Writing
              </label>
              <label>
                <input type="checkbox" name="Camping" /> Camping 
              </label>
              <label>
                <input type="checkbox" name="Gardening" /> Gardening
              </label>
              <label>
                <input type="checkbox" name="Art" /> Art
              </label>
              <label>
                <input type="checkbox" name="Dancing" /> Dancing
              </label>
              <br></br>
            </div>
          </div>

          <label htmlFor="age-range-min">
            Minimum Age Preference: {minAge}
          </label>
          <input
            type="range"
            id="age-range-min"
            name="age-range-min"
            min="18"
            max="100"
            value={minAge}
            onChange={(e) => setMinAge(e.target.value)}
          />

          <label htmlFor="age-range-max">
            Maximum Age Preference: {maxAge}
          </label>
          <input
            type="range"
            id="age-range-max"
            name="age-range-max"
            min="18"
            max="100"
            value={maxAge}
            onChange={(e) => setMaxAge(e.target.value)}
          />
          <h3>Privacy Settings</h3>
          <div className="privacy-settings">
            <label htmlFor="showProfile">
              <input
                type="checkbox"
                id="showProfile"
                name="showProfile"
                onChange={handleInputChange}
              />
              Show my profile to everyone
            </label>

            <label htmlFor="shareData">
              <input
                type="checkbox"
                id="shareData"
                name="shareData"
                onChange={handleInputChange}
              />
              Share my data for research purposes
            </label>
          </div>

          <h3>Notification Settings</h3>
          <div className="notification-settings">
            <label htmlFor="emailNotifications">
              <input
                type="checkbox"
                id="emailNotifications"
                name="emailNotifications"
                onChange={handleInputChange}
              />
              Email Notifications
            </label>

            <label htmlFor="smsNotifications">
              <input
                type="checkbox"
                id="smsNotifications"
                name="smsNotifications"
                onChange={handleInputChange}
              />
              SMS Notifications
            </label>
          </div>

          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
}

export default ProfileCreation;
