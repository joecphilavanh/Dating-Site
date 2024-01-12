import React from 'react';
// import { useUser } from '../UserContext';
import { Link } from 'react-router-dom';
// import logo from '../location of the logo'; 
import "../styles/Nav.css";



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


