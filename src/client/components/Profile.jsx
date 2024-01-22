import { useEffect, useState} from "react";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../supabase";
const Profile = () => {
  const { userId, token, isLoggedIn } = useAuth(); // Destructuring token from useAuth
  const [formData, setFormData] = useState({});
  // const [error, setError] = useState(null);
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const { data, error } = await supabase
            .from("Profiles")
            .select("*")
            .eq("user_id", userId);
        if (error) {
          console.log("Error fetching data: " + error.message);
        }
        setFormData(data[0]);
        console.log("authentication:", userId, token, isLoggedIn);
      } catch (error) {
        console.log(error);
      }
    };
    if (isLoggedIn) {
      fetchProfileData();
    }
  }, [userId, token, isLoggedIn]);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const { data, error } = await supabase
          .from("Profiles")
          .update(formData)
          .eq("user_id", userId)
          .select()
          .single(); // If you're expecting a single record

      if (error) {
        console.log(error);
      }

      console.log("Update successful:", data);
    } catch (error) {
      console.error("Error updating data:", error.message);
    }
  };



  useEffect(() => {
    console.log("Updated Profile:", formData);
  }, [formData]);
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