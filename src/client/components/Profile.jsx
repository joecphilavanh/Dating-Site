import "../styles/Profile.css";

const Profile = () => {
  return (
    <div id="profile">
      <h2>Update Account</h2>
      <section id="profile-data">
        <form action="">
          <div className="flex-box">
            <div id="profile-info">
              <label htmlFor="">
                <h3>First Name</h3> <br />
                <input type="email" />
              </label>
              <label htmlFor="">
                <h3>Birthday</h3>
                <br />
                <input type="date" />
              </label>
              <label htmlFor="">
                <h3>Gender</h3> <br />
                <select name="gender" id="gender">
                  <option value="">Select Gender</option>
                  <option value="Man">Man</option>
                  <option value="Woman">Woman</option>
                  <option value="non-binary">Non-binary</option>
                </select>
              </label>
              <label htmlFor="show-gender">
                <input name="show-gender" id="show-gender" type="checkbox" />
                Show my gender on my profile
              </label>
              <label htmlFor="">
                <h3>Show Me</h3> <br />
                <select name="my-prefs" id="my-prefs">
                  <option value="">Select Gender</option>
                  <option value="Man">Men</option>
                  <option value="Woman">Women</option>
                  <option value="non-binary">Everyone</option>
                </select>
              </label>
              <label htmlFor="">
                <h3>Looking for</h3>
                <button onClick="HandleRleationshipIntent">
                  + Add Relationship Intent
                </button>
              </label>
            </div>
            <div className="profile-pics">
              <h3>Profile Photo</h3>
              <ul>
                <li>
                  {/* {Some logic && img } */}
                  <img src="" alt="" />
                  <button>+</button>
                </li>
                <li>
                  <img src="" alt="" /> <button>+</button>
                </li>
                <li>
                  <img src="" alt="" /> <button>+</button>
                </li>
                <li>
                  <img src="" alt="" /> <button>+</button>
                </li>
                <li>
                  <img src="" alt="" /> <button>+</button>
                </li>
                <li>
                  <img src="" alt="" /> <button>+</button>
                </li>
              </ul>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Profile;
