import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
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
  const navigate = useNavigate();
  const navigateprofile = () => {
    navigate(`/profile`);
  };
  const fetchProfileData = async () => {
    try {
      const response = await fetch(`/api/profile/${profileId}`);
      if (response.ok) {
        const data = await response.json();
        setFormData(data);
      } else {
        alert("Profile not found.");
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchProfileData();
    }
  }, [userId, isLoggedIn]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value || "",
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const profileId = formData.profile_id;
    if (!profileId) {
      console.error("Profile ID not found");
      return;
    }

    try {
      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await fetch(`/api/profile/${profileId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Update successful:");
        document.querySelector("#profile-form").reset();
        fetchProfileData();
      } else {
        const errorResponseText = await response.text(); // Log the raw response text
        console.error(
          "Error updating profile:",
          response.statusText,
          errorResponseText
        );
      }
    } catch (error) {
      console.error("Error updating profile:", error.message);
    }
  };

  return (
    <section className="h-screen">
      <div className="flex flex-row items-center justify-center bg-gray-100">
        <div className="flex justify-center w-full max-w-4xl p-8 space-x-6 rounded-lg bg-white shadow-md">
          {/* User Information Section */}
          <div className="flex flex-col w-1/2 space-y-6">
            <h2 className="text-2xl font-bold text-center text-gray-700">
              Update My Profile
            </h2>
            <form
              id="profile-form"
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* Name */}
              <div>
                <label
                  htmlFor="Name"
                  className="block text-lg font-semibold text-gray-700"
                >
                  Name:
                </label>
                <input
                  type="text"
                  id="Name"
                  name="name"
                  className="w-full p-3 rounded-md border border-gray-300 text-lg"
                  value={formData.name}
                  placeholder={"John"}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label
                  htmlFor="username"
                  className="block text-lg font-semibold text-gray-700"
                >
                  Name:
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="w-full p-3 rounded-md border border-gray-300 text-lg"
                  value={formData.username}
                  placeholder="Nick Name"
                  onChange={handleInputChange}
                />
              </div>

              {/* Gender selection */}
              <div>
                <label
                  htmlFor="gender"
                  className="block mb-2 font-bold text-red-600"
                >
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
                <label className="block mb-2 font-bold text-red-600">
                  Height:
                </label>
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
                <label
                  htmlFor="smokes"
                  className="block mb-2 font-bold text-red-600"
                >
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
                <label
                  htmlFor="drinks"
                  className="block mb-2 font-bold text-red-600"
                >
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
              <div>
                <label
                  htmlFor="age_range_preference"
                  className="block mb-2 font-bold text-red-600"
                >
                  Age Preference
                </label>
                <input
                  type="text"
                  id="age_range_preference"
                  name="age_range_preference"
                  value={formData.age_range_preference || ""}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-md border border-gray-300 text-lg"
                />
              </div>
              <div>
                <label
                  htmlFor="profession"
                  className="block mb-2 font-bold text-red-600"
                >
                  Profession
                </label>
                <input
                  type="text"
                  id="profession"
                  name="profession"
                  value={formData.profession || ""}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-md border border-gray-300 text-lg"
                />
              </div>
              <div>
                <label
                  htmlFor="bio"
                  className="block text-lg font-semibold text-gray-700"
                >
                  Bio:
                </label>
                <textarea
                  className="w-full p-3 rounded-md border border-gray-300 text-lg"
                  name="bio"
                  id="bio"
                  cols="30"
                  rows="10"
                  value={formData.bio || ""}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <div className="flex justify-center space-x-4">
                <button
                  type="submit"
                  className="bg-red-600 text-white p-3 rounded-md cursor-pointer text-lg transition duration-300 hover:bg-purple-500"
                >
                  Update Profile
                </button>
                <button
                  type="button" // Use type="button" to prevent form submission on click if not intended
                  className="bg-red-600 text-white p-3 rounded-md cursor-pointer text-lg transition duration-300 hover:bg-red-700"
                  onClick={navigateprofile}
                >
                  View Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Profile;
