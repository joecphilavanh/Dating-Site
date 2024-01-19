// FetchProfiles.js
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase';

const FetchProfiles = () => {
    const [profiles, setProfiles] = useState([]);
    const [error, setError] = useState(null);
    const [currentPic, setCurrentPic] = useState(0);

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const { data, error } = await supabase
                    .from('Profiles')
                    .select('picture_url, name'); 

                if (error) {
                    console.log('Error fetching data: ' + error.message);
                }

                setProfiles(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchProfiles();
    }, []);

    const handleNext = () => {
        setCurrentPic((prevPic) => (prevPic + 1) % profiles.length);
    };

    const handleBack = () => {
        setCurrentPic((prevPic) => (prevPic- 1 + profiles.length) % profiles.length);
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>Profiles</h2>
            <div>
                {profiles.length > 0 && (
                    <div>
                        <img src={profiles[currentPic].picture_url} alt={`Profile ${currentPic + 1}`} />
                        <p>{profiles[currentPic].name}</p> 
                    </div>
                )}
            </div>
            <div>
                <button onClick={handleBack}>Back</button>
                <button onClick={handleNext}>Next</button>
                <button>Like</button>
            </div>
        </div>
    );
};

export default FetchProfiles;
