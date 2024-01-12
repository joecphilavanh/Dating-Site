import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/Nav.css";

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/">logo</Link>
            </div>
            <div className="navbar-right">
                <Link to="/ProfileCreation" className="navbar-link">Profile Creation</Link>
                <Link to="/notifications" className="navbar-link">Notifications</Link>
                <Link to="/matches" className="navbar-link">Matches</Link>
                <Link to="/logout" className="navbar-link">Logout</Link>
            </div>
        </nav>
    );
}
export default Navbar;
