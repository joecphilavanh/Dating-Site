import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Discover = () => {
    const [randomProfile, setRandomProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { userId } = useAuth(); 

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

    const Age = (birthdate) => {
        const today = new Date();
        const birthDate = new Date(birthdate);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        return age;
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
        <div className="bg-white p-5 rounded-lg max-w-lg mx-auto my-8 shadow-md border border-red-600">
                <div className="flex h-full">
                   
                        <img src={randomProfile.picture_url} alt="Profile" className="object-cover h-full w-full" />
                    
                   
                </div>
                        <h2 className="text-lg font-semibold">{randomProfile.name}</h2>
            <p>Age: {Age(randomProfile.birthdate)}</p> 
                     
            <div className="w-full max-w-3xl flex justify-center space-x-4 mt-4 ">
            <button className="bg-red-600  text-white p-2 rounded-md transition duration-300 hover:bg-red-700" onClick={handleNextClick}>
                Next
            </button>
            <button className="bg-red-600 text-white p-2 rounded-md transition duration-300 hover:bg-red-700" onClick={handleViewProfileClick}>
                View Profile
            </button>
                <button className="heart-button bg-red-600 text-white p-3 rounded-md cursor-pointer text-lg transition duration-300 hover:bg-purple-600 " onClick={handleHeartClick}>
                    Like
                    <span className="top-part"></span>
                    <span className="bottom-part"></span>
                </button>
            </div>
        </div>
    );
};

export default Discover;