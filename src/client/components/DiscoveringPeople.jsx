import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Discover = () => {
    const [randomProfile, setRandomProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchRandomProfile();
    }, []);

    const fetchRandomProfile = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/profile/random');
            if (!response.ok) {
                alert('Failed to fetch random profile');
            }
            const profile = await response.json();
            setRandomProfile(profile);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleNextClick = () => {
        fetchRandomProfile();
    };

    const handleViewProfileClick = () => {
        if (randomProfile) {
            // Use the existing 'get profile by ID' endpoint
            navigate(`/profile/${randomProfile.profile_id}`);
        }
    };

    const handleHeartClick = () => {
        console.log('Heart clicked');
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!randomProfile) {
        return <div>No profiles available.</div>;
    }

    return (
        <div className="discover-container">
            <div className="profile-card">
                <img src={randomProfile.picture_url} alt="Profile" />
                <h2>{randomProfile.name}</h2>
                <div className="buttons">
                    <button onClick={handleNextClick}>Next</button>
                    <button onClick={handleViewProfileClick}>View Profile</button>
                    <button onClick={handleHeartClick}>Heart</button>
                </div>
            </div>
        </div>
    );
};

export default Discover;
