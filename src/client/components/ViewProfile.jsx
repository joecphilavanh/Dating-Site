import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ViewProfile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const {profileId} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/profile/${profileId}`);
                if (!response.ok) {
                    const errMsg = await response.text();
                    console.log(`Failed to fetch profile: ${errMsg}`);
                    setError(`Failed to fetch profile: ${errMsg}`);
                } else {
                    const data = await response.json();
                    setProfile(data);
                }
            } catch (error) {
                console.log('Error:', error);
                setError('Error loading profile');
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [profileId]);

    const goBack = () => {
        navigate(-1);
    };

    if (loading) {
        return <div className="text-center p-10 text-xl">Loading profile...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-center p-10 text-xl">{error}</div>;
    }

    if (!profile) {
        return <div className="text-gray-500 text-center p-10 text-xl">Profile not found</div>;
    }

    return (
        <div className="flex justify-center items-center bg-gray-800 min-h-screen">
            <div className="profile-container mx-auto p-6 text-white shadow-lg rounded-lg border-4 border-red-500">
                <div className="text-center">
                    <div className="inline-block p-2">
                        <img
                            src={profile.picture_url}
                            alt="Profile"
                            className="h-32 w-32 mx-auto"
                        />
                    </div>
                    <h1 className="text-2xl font-semibold text-red-500 mt-4">{profile.name}</h1>
                    <div className="text-gray-600 text-lg p-4 rounded-lg  border-red-500 mt-4">
                        <p className="mb-2"><strong>Gender:</strong> {profile.gender}</p>
                        <p className="mb-2"><strong>Orientation:</strong> {profile.orientation}</p>
                        <p className="mb-2"><strong>Body Type:</strong> {profile.body_type}</p>
                        <p className="mb-2"><strong>Hometown:</strong> {profile.hometown}</p>
                        <p className="mb-2"><strong>Looking For:</strong> {profile.looking_for}</p>
                        <p className="mb-2"><strong>Current Location:</strong> {profile.current_location}</p>
                    </div>
                    <Link
                        to={`/send-message/${profile.user_id}`} // Use the 'user_id' from the fetched profile
                        className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md transition duration-300 mt-4"
                    >
                        Send Message
                    </Link>

                    <button
                        onClick={goBack}
                        className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md transition duration-300 mt-4"
                    >
                        Back
                    </button>
                </div>
            </div>
        </div>
    );

}

 export default ViewProfile;



