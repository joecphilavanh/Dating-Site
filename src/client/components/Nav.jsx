import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/Nav.css";



function Navbar() {
    return (
        <nav className="navbar">
            <ul>
                <li>
                    <Link to="/">
                        logo
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


