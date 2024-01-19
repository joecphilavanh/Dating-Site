// FetchProfiles.js
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase';

const FetchProfiles = () => {
    const [profiles, setProfiles] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const { data, error } = await supabase
                    .from('Profiles')
                    .select('picture_url');

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

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>Profiles</h2>
            <div>
                {profiles.map((profile, index) => (
                    <div key={index}>
                        <img src={profile.picture_url} alt={`Profile ${index + 1}`} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FetchProfiles;
