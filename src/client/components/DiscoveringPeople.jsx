import React, { useEffect, useState } from 'react';

const DiscoveringPeople = () => {
    const [profileImages, setProfileImages] = useState([]);

    useEffect(() => {
        const fetchProfileImages = async () => {
            try {
                const response = await fetch('http://localhost:3000/profiles/picture_url/');
                if (response.ok) {
                    const data = await response.json();
                    setProfileImages(data);
                } else {
                    console.error('Server responded with a non-OK status:', response.status);
                }
            } catch (error) {
                console.error('Error fetching profile images:', error);
            }
        };

        fetchProfileImages();
    }, []);

    return (
        <div>
            <h2>Discovering People</h2>
            <div>
                {profileImages.map((image, index) => (
                    <div key={index} className="image-item">
                        <img src={image.picture_url} alt={`Profile Image ${index + 1}`} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DiscoveringPeople;