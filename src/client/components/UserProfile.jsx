import React, { useState } from "react";
import  './App.css';

const UserProfile = ({ user }) => {

    return(

        <>
        <div className="user-profile-card">
            <h1>Profile</h1>
            <div className="profile-name">Jackson</div>
            <div className="gradiant"></div>
            <div className="profile-down">
                <img src="itMovie.jpg" alt="Profile Picture" />
                <div className="profile-title"></div>
                <div className="profile-description">
                    Testing Testing

                </div>

                <div className="headlines">
                    <h3>Headlines</h3>
                    <p></p>
                </div>
                <div className="profile-button"></div>
            </div>

            </div>
        
        </>
    )
}

export default UserProfile;