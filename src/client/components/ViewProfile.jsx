import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ViewProfile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { profileId } = useParams();
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

    const calculateAge = (birthdate) => {
        const today = new Date();
        const birthDate = new Date(birthdate);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

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
        <div style={{ backgroundColor: '#1F2937', maxWidth: '900px' }} className="p-5 rounded-lg mx-auto my-8 shadow-md border-4 border-red-600">
            <div className="bg-white p-5 rounded-lg mx-auto my-8 shadow-md border-4 border-red-600" style={{ maxWidth: '900px' }}>
                <div className="flex justify-center items-center min-h-screen">
                    <div className="flex flex-row items-start space-x-6 mx-auto p-6 bg-white shadow-lg rounded-lg border-4 border-red-500 mt-12">
                        <div className="w-full md:w-1/2 h-auto">
                            <img
                                src={profile.picture_url}
                                alt="Profile"
                                style={{ width: '90%', height: '90%', objectFit: 'cover', objectPosition: 'center' }}
                                className="rounded-lg"
                            />
                        </div>
                        <div className="flex-none" style={{ flexBasis: '50%' }}>
                            <h1 className="text-2xl font-semibold text-red-500 mt-4">
                                {profile.name}, <span className="text-3xl">{calculateAge(profile.birthdate)}</span>
                            </h1>
                            <p className="text-lg ">{profile.current_location}</p>
                            <hr className="my-2 border-t-4 border-gray-300" />
                            <p className="text-lg">{profile.bio}</p>
                            <hr className="my-2 border-gray-300" />
                            <div>
                                <p><strong>Gender:</strong> {profile.gender}</p>
                                <p><strong>Orientation:</strong> {profile.orientation}</p>
                                <p><strong>Body Type:</strong> {profile.body_type}</p>
                                <p><strong>Height (ft):</strong> {profile.height_ft}'{profile.height_in}</p>
                            </div>
                            <div>
                                <p><strong>Hometown:</strong> {profile.hometown}</p>
                                <p><strong>Ethnicity:</strong> {profile.ethnicity}</p>
                                <p><strong>Looking For:</strong> {profile.looking_for}</p>
                                <p><strong>Age Preference:</strong> {profile.age_preference}</p>
                            </div>
                            <button
                                onClick={goBack}
                                className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md transition duration-300 mt-4"
                            >
                                Back
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewProfile;
