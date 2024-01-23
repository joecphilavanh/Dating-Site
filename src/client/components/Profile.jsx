import { useEffect, useState} from "react";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { userId, isLoggedIn } = useAuth();
  const [formData, setFormData] = useState({});

  const fetchProfileData = async () => {
    try {
      const response = await fetch(`/api/profile/${userId}`);
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
      [name]: value,
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Current form data:", formData);
    const profileId = formData.profile_id;
    if (!profileId) {
      console.error("Profile ID not found");
      return;
    }

    try {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage
      if (!token) {
        console.error("No token found");
        return;
      }

      // Send a PUT request to the backend with the profileId and updated data
      const response = await fetch(`/api/profile/${profileId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Include the authorization token
        },
        body: JSON.stringify({
          name: formData.name,
          gender: formData.gender,
          // Include other fields as necessary
        }), // Send the updated profile data
      });

      if (response.ok) {
        alert("Update successful:");
        // Redirect or update state as necessary
      } else {
        console.error("Error updating profile:", response.statusText);
        // Handle specific error responses here as needed
      }
    } catch (error) {
      console.error("Error updating profile:", error.message);
      // Handle unexpected errors here
    }
  };

  return (
      <section className="h-screen">
        <div className="flex items-center justify-center bg-gray-100">
          <div className="flex w-full max-w-4xl p-8 space-x-6 rounded-lg bg-white shadow-md">
            {/* User Information Section */}
            <div className="flex flex-col w-1/2 space-y-6">
              <h2 className="text-2xl font-bold text-center text-gray-700">
                Update My Profile
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
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
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"
                      placeholder={formData.name}
                      onChange={handleInputChange}
                  />
                </div>
                {/* Birthday */}
                {/* Gender */}
                <div>
                  <label
                      htmlFor="gender"
                      className="block text-lg font-semibold text-gray-700"
                  >
                    Gender:
                  </label>
                  <select
                      id="gender"
                      name="gender"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"
                      value={formData.gender}
                      onChange={handleInputChange}
                  >
                    <option value="">Select Gender</option>
                    <option value="Man">Man</option>
                    <option value="Woman">Woman</option>
                    <option value="non-binary">Non-binary</option>
                  </select>
                </div>
                {/* Show Gender Checkbox */}
                {/* <div>
                <label
                  htmlFor="show-gender"
                  className="flex items-center space-x-2"
                >
                  <input
                    name="show-gender"
                    id="show-gender"
                    type="checkbox"
                    className="w-5 h-5"
                    onChange={handleInputChange}
                  />
                  <span className="text-lg font-semibold text-gray-700">
                    Show my gender on my profile
                  </span>
                </label>
              </div> */}
                {/* Show Me */}
                {/* <div>
                <label
                  htmlFor="my-prefs"
                  className="block text-lg font-semibold text-gray-700"
                >
                  Show Me:
                </label>
                <select
                  id="my-prefs"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"
                >
                  <option value="">Select Gender</option>
                  <option value="Man">Men</option>
                  <option value="Woman">Women</option>
                  <option value="non-binary">Everyone</option>
                </select>
              </div> */}
                <button
                    type="submit"
                    className="bg-red-600 text-white p-3 rounded-md cursor-pointer text-lg transition duration-300 hover:bg-purple-500"
                >
                  Update Profile
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
  );
};
export default Profile;