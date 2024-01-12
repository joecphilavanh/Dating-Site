import React, { useState } from "react";
import  './App.css';

const LandingPage = () => {
    const [username, setUsername] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (u) => {
        u.preventDefault();
        console.log(username);

    }
    return (
        <>
        <h1 className="text">Sign In</h1>
        <div className="login-form-container">
    

        <form onSubmit={handleSubmit}>
            <label for="username">Username</label>
            <input value={username} onChange={(u) => setUsername(u.target.value)} type="username" placeholder="Enter Username" id="username" name="username"></input>
            <label for="password">Password</label>
            <input value={pass} onChange={(u) => setPass(u.target.value)} type="password" placeholder="Enter Password" id="password" name="password"></input>
            <button type="sumbit">Log In</button>
        </form>
        </div>

        <button className="no-account-button">Don't have an account? Register here.</button>
        </>

        
        
            
       
        
        
    )
}

export default LandingPage