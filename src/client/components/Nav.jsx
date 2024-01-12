import React from 'react';
// import { useUser } from '../UserContext';
import { Link } from 'react-router-dom';
// import logo from '../location of the logo'; 


function Navbar() {
    const user = useUser();
    return (
        <nav className="navbar">
            <ul>
                <li>
                    <Link to="/">
                        /* put the link to our logo for them to click */
                        Home
                    </Link>
                </li>
            </ul>
            <ul className="navbar-right">
                <li><Link to="/profile" className="navbar-link">Profile Creation</Link></li>
                <li><Link to="/notifications" className="navbar-link">Notifications</Link></li>
                <li><Link to="/matches" className="navbar-link">Matches</Link></li>
                <li><Link to="/logout" className="navbar-link">Logout</Link></li>
            </ul>
        </nav>
    );
}
export default Navbar;


// .navbar {
//     background-color: black;
//     padding: 10px 0;
//     position: fixed;
//     top: 0;
//     left: 0;
//     width: 100%;
//     z-index: 1000;
//     box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//   }
//   body {
//     padding-top: 63px;
//   }
//   .navbar-list {
//     list-style-type: none;
//     margin: 0;
//     padding: 0;
//     overflow: hidden;
//     display: flex;
//     justify-content: space-between;
//   }
//   .navbarLeft,
//   .navbarRight {
//     display: flex;
//   }
//   .navbar-link {
//     display: block;
//     color: white;
//     text-align: center;
//     padding: 14px 16px;
//     text-decoration: none;
//   }
  
//   .navbar-link:hover {
//     background-color: #333;
//   }