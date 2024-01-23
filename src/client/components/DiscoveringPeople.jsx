import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Discover = () => {
    const [randomProfile, setRandomProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { userId } = useAuth(); // Retrieve the current user's ID from the authentication context

    useEffect(() => {
        fetchRandomProfile();
    }, []);

    const fetchRandomProfile = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/profile/random');
            if (!response.ok) {
                alert('Failed to fetch random profile');
                return;
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
        if (randomProfile && randomProfile.profile_id) {
            navigate(`/profile/${randomProfile.profile_id}`);
        } else {
            console.error('Profile ID is missing');
        }
    };


    const handleHeartClick = async () => {
        if (!randomProfile || !userId) {
            console.log('Profile or user ID missing');
            return;
        }

        try {
            const response = await fetch('/api/like', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    liker_id: userId,
                    liked_id: randomProfile.user_id,
                }),
            });

            if (!response.ok) {
                alert('Failed to send like');
            }

            console.log('Like sent successfully');
        } catch (error) {
            console.error('Error sending like:', error);
        }
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

