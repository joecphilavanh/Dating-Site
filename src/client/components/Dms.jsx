import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Dms = () => {
    const [dms, setDms] = useState([]);
    const { userId } = useContext(AuthContext);

    useEffect(() => {
        const fetchDms = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/message/inbox/${userId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setDms(data);
            } catch (error) {
                console.error("Error fetching DMs:", error);
            }
        };

        if (userId) {
            fetchDms();
        }
    }, [userId]);

    const renderProfileImage = (dm) => {
        const profile = dm.Profiles[0];
        const imageSize = { width: '64px', height: '64px' };

        if (profile && profile.picture_url) {
            return (
                <Link to={`/messages/${dm.user_id}`}>
                    <img src={profile.picture_url} alt={`${dm.username}'s profile`} style={imageSize} className="rounded-full object-cover" />
                </Link>
            );
        } else {
            return (
                <Link to={`/messages/${dm.user_id}`}>
                    <img src="defaultimage.png" alt="Default Avatar" style={imageSize} className="rounded-full object-cover" />
                </Link>
            );
        }
    };


    return (
        <div className="p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Your DMs</h2>
            <ul className="space-y-4">
                {dms.map(dm => (
                    <li key={dm.user_id} className="flex items-center space-x-4">
                        {renderProfileImage(dm)}
                        <Link to={`/messages/${dm.user_id}`} className="text-lg text-gray-800">
                            {dm.username}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dms;
