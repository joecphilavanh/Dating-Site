import React, { useEffect, useState, useContext } from "react";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../supabase";

const Profile = () => {
  const { userId, token, isLoggedIn } = useAuth(); // Destructuring token from useAuth
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
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
    try {
      const { data, error } = await supabase
        .from("Profiles")
        .update(formData)
        .eq("user_id", userId)
        .select();

      if (error) {
        console.error("Error updating data:", error.message);
      } else {
        console.log("Update successful:", data);
      }
    } catch (error) {
      console.error("Error updating data:", error.message);
    }
  };
  useEffect(() => {
    console.log("Updated Profile:", formData);
  }, [formData]);

  return (
    <section classname="h-screen">
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

// {/* <section classname="h-screen">
//       <div className="flex items-center justify-center bg-gray-100">
//         <div className="flex w-full max-w-4xl p-8 space-x-6 rounded-lg bg-white shadow-md">
//           {/* User Information Section */}
//           <div className="flex flex-col w-1/2 space-y-6">
//             <h2 className="text-2xl font-bold text-center text-gray-700">
//               Update Account
//             </h2>
//             <form action="" className="space-y-6">
//               {/* Name */}
//               <div>
//                 <label
//                   htmlFor="Name"
//                   className="block text-lg font-semibold text-gray-700"
//                 >
//                   Name:
//                 </label>
//                 <input
//                   type="text"
//                   id="Name"
//                   className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"
//                   placeholder={profile.name}
//                 />
//               </div>

//               {/* Birthday */}
//               <div>
//                 <label
//                   htmlFor="birthday"
//                   className="block text-lg font-semibold text-gray-700"
//                 >
//                   Birthday:
//                 </label>
//                 <input
//                   type="date"
//                   id="birthday"
//                   className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"
//                 />
//               </div>

//               {/* Gender */}
//               <div>
//                 <label
//                   htmlFor="gender"
//                   className="block text-lg font-semibold text-gray-700"
//                 >
//                   Gender:
//                 </label>
//                 <select
//                   id="gender"
//                   className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"
//                 >
//                   <option value="">Select Gender</option>
//                   <option value="Man">Man</option>
//                   <option value="Woman">Woman</option>
//                   <option value="non-binary">Non-binary</option>
//                 </select>
//               </div>

//               {/* Show Gender Checkbox */}
//               <div>
//                 <label
//                   htmlFor="show-gender"
//                   className="flex items-center space-x-2"
//                 >
//                   <input
//                     name="show-gender"
//                     id="show-gender"
//                     type="checkbox"
//                     className="w-5 h-5"
//                   />
//                   <span className="text-lg font-semibold text-gray-700">
//                     Show my gender on my profile
//                   </span>
//                 </label>
//               </div>

//               {/* Show Me */}
//               <div>
//                 <label
//                   htmlFor="my-prefs"
//                   className="block text-lg font-semibold text-gray-700"
//                 >
//                   Show Me:
//                 </label>
//                 <select
//                   id="my-prefs"
//                   className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"
//                 >
//                   <option value="">Select Gender</option>
//                   <option value="Man">Men</option>
//                   <option value="Woman">Women</option>
//                   <option value="non-binary">Everyone</option>
//                 </select>
//               </div>

//               {/* Looking for */}
//               <div>
//                 <label
//                   htmlFor="lookingFor"
//                   className="block text-lg font-semibold text-gray-700"
//                 >
//                   Looking for:
//                 </label>
//                 <button
//                   onClick={(e) => {
//                     e.preventDefault();
//                   }}
//                   className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
//                 >
//                   + Add Relationship Intent
//                 </button>
//               </div>
//             {/* </form> */}
//           </div>

//           {/* Profile Pictures Section */}
//           <div className="w-1/2">
//             <h3 className="text-xl font-bold text-center text-gray-700">
//               Profile Photo
//             </h3>
//             <div className="space-y-4 mt-4">
//               {/* Profile Photo Placeholders */}
//               <div className="flex justify-center space-x-2">
//                 <img
//                   src="placeholder-image.jpg"
//                   alt="Profile"
//                   className="w-24 h-24 rounded-full border border-gray-300"
//                 />
//                 {/* Add more images as needed */}
//               </div>
//               <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 w-full">
//                 Upload New Photo
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="flex items-center justify-center bg-gray-100">
//         <div className="flex w-full max-w-4xl p-8 space-x-6 rounded-lg bg-white shadow-md">
//           {/* User Information Section */}
//           <div className="flex flex-col w-1/2 space-y-6">
//             {/* <form action="" className="space-y-6"> */}
//               <div>
//                 <label
//                   htmlFor="hobbies"
//                   className="block text-lg font-semibold text-gray-700"
//                 >
//                   Looking for:
//                 </label>
//                 <button
//                   onClick={(e) => {
//                     e.preventDefault();
//                   }}
//                   className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
//                 >
//                   + Add Relationship Intent
//                 </button>
//               </div>
//             </form>
//           </div>

//           {/* Profile Pictures Section */}
//           <div className="w-1/2">
//             <h3 className="text-xl font-bold text-center text-gray-700">
//               Profile Photo
//             </h3>
//             <div className="space-y-4 mt-4">
//               {/* Profile Photo Placeholders */}
//               <div className="flex justify-center space-x-2">
//                 <img
//                   src="placeholder-image.jpg"
//                   alt="Profile"
//                   className="w-24 h-24 rounded-full border border-gray-300"
//                 />
//                 {/* Add more images as needed */}
//               </div>
//               <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 w-full">
//                 Upload New Photo
//               </button>
//             </div>
//           </div>
//         </div>

//       </div>
//     </section>
